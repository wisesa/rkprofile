import React, {Fragment, useEffect} from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import { getItems } from '../../actions/transactions';

const Print = ({
  getItems, item:{items,loading},
  match
}) => { 

    useEffect(() => {
        getItems(match.params.id);
        console.log(items);
    }, [getItems,loading]);

    const goToOrder = (event) => {
      event.preventDefault();
      window.location = `/order`;
    };

  //console.log(menu)
    return loading ? (
      <Spinner />
        ) : (
      <Fragment>
        <div className="container print bg-white">
          <div className="row mb-5">
            <div className="col-lg-6 col-md-6">
                <h3 className>Transaction Note</h3>
                <h5 className>Cashier : Brad</h5>
                <h5 className>{items._id}&nbsp;</h5>
            </div>
            <div className="col-lg-6 col-md-6 right">
              <img src="https://mighty-reef-58921.herokuapp.com/img/logo.png" class="logo-print" alt=""></img>
            </div>
          </div>
        {items.menu.map((item,index) => (
            <div className="row">
                <div className="col-lg-4 col-md-4">
                    <b>{item.name}</b>
                </div>
                <div className="col-lg-4 col-md-4 right">
                    {item.amount}
                </div>
                <div className="col-lg-4 col-md-4 right">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price*item.amount)}
                </div>
            </div>
          ))}
          <div className="row">
              <div className="col-lg-12">
                <hr></hr>
              </div>
          </div>
          <div className="row">
              <div className="col-lg-4 col-md-4">
                  <b>Grand Total</b>
              </div>
              <div className="col-lg-4 col-md-4 right">
                  
              </div>
              <div className="col-lg-4 col-md-4 right">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(items.total)}
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row mt-3">
              <div className="col-lg-12 right">
                <button className="btn btn-danger" onClick={goToOrder}>Order Again</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={window.print}>Print</button>
              </div>
          </div>
        </div>
      </Fragment>
    );
  };

Print.propTypes = {
  getItems: propTypes.func.isRequired,
  item: propTypes.object.isRequired
}

const mapStateToProps= state => ({
  item: state.item
});

export default connect(
  mapStateToProps, 
  {getItems}
)(Print);