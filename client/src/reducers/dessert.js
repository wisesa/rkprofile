import { post } from 'request';
import {
    GET_DESSERTS,
    GET_DESSERT,
    DELETE_DESSERT,
    DESSERT_ERROR
} from '../actions/types';

const initialState = { 
    desserts: [],
    dessert: null,
    loadingDessert:true,
    error:{}
 }

 export default function (state=initialState, action){
     const {type, payload} = action;

     switch(type){
         case GET_DESSERTS:
            return {
                ...state,
                desserts: payload,
                loadingDessert:false
            }
         case GET_DESSERT:
            return {
                ...state,
                dessert: payload,
                loadingDessert:false
            }
         case DELETE_DESSERT:
            return{
                ...state,
                desserts: state.desserts.filter(dessert=>dessert._id !== payload),
                loadingDessert:false
            }
         case DESSERT_ERROR:
            return {
                ...state,
                error: payload,
                loadingDessert:false
            }
        default:
            return state;
     }
 }