import { post } from 'request';
import {
    GET_ITEMS,
    GET_ITEM,
    ITEM_ERROR
} from '../actions/types';

const initialState = { 
    items: [],
    item: null,
    loading:true,
    error:{}
 }

 export default function (state=initialState, action){
     const {type, payload} = action;

     switch(type){
         case GET_ITEMS:
            return {
                ...state,
                items: payload,
                loading:false
            }
         case GET_ITEM:
            return {
                ...state,
                item: payload,
                loading:false
            }
         case ITEM_ERROR:
            return {
                ...state,
                error: payload,
                loading:false
            }
        default:
            return state;
     }
 }