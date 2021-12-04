import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_TRANSACTIONS,
    GET_TRANSACTION,
    TRANSACTION_ERROR,
    GET_ITEMS,
    GET_ITEM,
    ITEM_ERROR,
} from './types';

// Get posts
export const getTransactions = () => async dispatch => {
    try {
        const res=await axios.get('/api/transaction/');

        dispatch({
            type:GET_TRANSACTIONS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get post
export const getItems = id => async dispatch => {
    try {
        const res=await axios.get(`/api/transaction/${id}`);
        //console.log(res.data);

        dispatch({
            type:GET_ITEMS,
            payload:res.data
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: ITEM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}