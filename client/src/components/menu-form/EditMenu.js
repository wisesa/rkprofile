import React, { Fragment, useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import Progress from './Progress';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import { getMenu } from '../../actions/menu';
import {withRouter} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const EditMenu = ({
  menu :{menu, loading}, 
  getMenu, 
  match
}) => {
  
  const [formData, setFormData] = useState({
      name: '',
      price: '',
      type: '',
      //pic: ''
  });

  useEffect(() => {
    getMenu(match.params.id);

  }, [loading, getMenu]);

  useEffect(() => {
    console.log(menu);
    setFormData({
      name: loading || !menu.name ? '' : menu.name,
      price: loading || !menu.price ? '' : menu.price,
      type: loading || !menu.type ? '' : menu.type,
      //pic: loading || !menu.pic ? '' : menu.pic,
  });
  }, [menu._id]);

  const {name, price, type, pic} = formData;

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onTextChange = e => setFormData({...formData,[e.target.name]:e.target.value});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('type', type);
    //formData.append('file', file);

    try {
      const res = await axios.put('/api/menu/'+menu._id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      window.location = "/menus";
      //<Redirect to="/dashboard" />;
    } catch (err) {
      setMessage(err);
      // if (err.response.status === 500) {
      //   setMessage('There was a problem with the server');
      // } else {
      //   setMessage(err.response.data.msg);
      // }
      setUploadPercentage(0)
    }
  };

  return (
    <Fragment>
      {menu === null || loading ? <Spinner /> : <Fragment>

        <div className="d-flex justify-content-center mt-5">
        <form onSubmit={onSubmit}>
          <table className="mt-5" cellPadding="10">
            <thead>
              <tr>
                <td className="center" colSpan="3">
                  <h2>EDIT MENU</h2>
                </td>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td className="center" colSpan="4"></td>
            </tr>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td><input required value={name} type="text" name="name" onChange={e => onTextChange(e)} /></td>
              {/* <td rowSpan="4">
                  <img className="img-menu" style={{ width: '200px' }} src={`https://mighty-reef-58921.herokuapp.com/menu/${pic}`} alt='' />
              </td> */}
            </tr>
            <tr>
              <td>Price</td>
              <td>:</td>
              <td><input required value={price} type="text" name="price" onChange={e => onTextChange(e)} /></td>
            </tr>
            <tr>
              <td>Type</td>
              <td>:</td>
              <td>
                <select name="type" value={type} onChange={e => onTextChange(e)}>
                  <option value="0">* Select Dish Type</option>
                  <option value="1" selected>Appetizer</option>
                  <option value="2">Main Course</option>
                  <option value="3">Dessert</option>
                </select>
              </td>
            </tr>
            {/* <tr>
              <td>Image</td>
              <td>:</td>
              <td>
                <input
                  type='file'
                  className='custom-file-input'
                  id='customFile'
                  required
                  onChange={onChange}
                />
              </td>
            </tr> */}
            <tr>
              <td></td>
              <td></td>
              <td>
                {/* <Progress percentage={uploadPercentage} />
                {uploadedFile ? (
                    <div>
                      <h3 className='text-center'>{uploadedFile.fileName}</h3>
                      <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                    </div>
                ) : null} */}
                <input
                  type='submit'
                  value='Upload'
                  className='btn btn-primary btn-block mt-4'
                />
              </td>
            </tr>
            </tbody>
            </table>
        </form>
      </div>
      </Fragment>}
    </Fragment>
  );
};

EditMenu.propTypes = {
    getMenu: propTypes.func.isRequired,
    menu: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    menu:state.menu
});

export default connect(
    mapStateToProps, 
    {getMenu}
)(withRouter(EditMenu));
