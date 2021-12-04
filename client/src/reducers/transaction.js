import { post } from 'request';
import {
    GET_TRANSACTIONS,
    GET_TRANSACTION,
    TRANSACTION_ERROR
} from '../actions/types';

const initialState = { 
    transactions: [],
    transaction: null,
    loading:true,
    error:{}
 }

 export default function (state=initialState, action){
     const {type, payload} = action;

     switch(type){
         case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: payload,
                loading:false
            }
         case GET_TRANSACTION:
            return {
                ...state,
                transaction: payload,
                loading:false
            }
         case TRANSACTION_ERROR:
            return {
                ...state,
                error: payload,
                loading:false
            }
        default:
            return state;
     }
 }