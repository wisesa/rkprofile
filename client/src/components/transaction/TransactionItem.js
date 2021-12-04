import React, {Fragment, useEffect} from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';

const TransactionItem = ({
  transaction: { _id, user_id, total, menu, date },
  count: no
}) => { 
  //console.log(menu)
  return(
    <div className="sub-trans bg-white">
      <div className="center">
          <h3><span>{no}</span></h3>
      </div>
      <div className="m-2">
        {_id}
      </div>
      <div className="m-2 right">
        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total)}
      </div>
      <div className="m-2 center">
          <Moment format='DD-MM-YYYY HH:mm:ss'>{date}</Moment>
      </div>
      
    </div>
    )};

const mapStateToProps= state => ({
    auth: state.auth
});

export default connect(
  mapStateToProps, 
  null
)(TransactionItem);