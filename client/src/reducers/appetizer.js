import { post } from 'request';
import {
    GET_APPETIZERS,
    GET_APPETIZER,
    DELETE_APPETIZER,
    APPETIZER_ERROR
} from '../actions/types';

const initialState = { 
    appetizers: [],
    appetizer: null,
    loadingAppetizer:true,
    error:{}
 }

 export default function (state=initialState, action){
     const {type, payload} = action;

     switch(type){
         case GET_APPETIZERS:
            return {
                ...state,
                appetizers: payload,
                loadingAppetizer:false
            }
         case GET_APPETIZER:
            return {
                ...state,
                appetizer: payload,
                loadingAppetizer:false
            }
         case DELETE_APPETIZER:
            return{
                ...state,
                appetizers: state.appetizers.filter(appetizer=>appetizer._id !== payload),
                loadingAppetizer:false
            }
         case APPETIZER_ERROR:
            return {
                ...state,
                error: payload,
                loadingAppetizer:false
            }
        default:
            return state;
     }
 }