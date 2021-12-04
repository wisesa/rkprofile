import React, {Fragment, useEffect} from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteMenu} from '../../actions/menu';

const MenuItem = ({
  deleteMenu,
  menu: { _id, name, price, type, pic }
}) => (
    <div class="post menu bg-white p-1 my-1">
      {/* <div>
        <img class="img-menu" src={`https://mighty-reef-58921.herokuapp.com/menu/${pic}`} />
      </div> */}
      <div>
        <h3 class="my-1">
          {name}
        </h3>
        <h3 class="my-1">
          {price}
        </h3>
      </div>
      <div>
          <Link to={`/editmenu/${_id}`}>
            <div class="btn btn-danger">
                    {<i class="fas fa-edit"></i>}
            </div>
          </Link>
          <button onClick={e => deleteMenu(_id)}
              type="button"
              class="btn btn-danger">
                  {<i class="fas fa-times"></i>}
          </button>
      </div>
    </div>
    );

MenuItem.defaultProps = {
  showActions: true
}


MenuItem.propTypes = {
    deleteMenu:propTypes.object.isRequired
}

const mapStateToProps= state => ({
    auth: state.auth
});

export default connect(
  mapStateToProps, 
  {deleteMenu}
)(MenuItem);