import { post } from 'request';
import {
    GET_MAINCOURSES,
    GET_MAINCOURSE,
    MAINCOURSE_ERROR,
    DELETE_MAINCOURSE
} from '../actions/types';

const initialState = { 
    maincourses: [],
    maincourse: null,
    loadingMaincourse:true,
    error:{}
 }

 export default function (state=initialState, action){
     const {type, payload} = action;

     switch(type){
         case GET_MAINCOURSES:
            return {
                ...state,
                maincourses: payload,
                loadingMaincourse:false
            }
         case GET_MAINCOURSE:
            return {
                ...state,
                maincourse: payload,
                loadingMaincourse:false
            }
         case DELETE_MAINCOURSE:
            return{
                ...state,
                maincourses: state.maincourses.filter(maincourse=>maincourse._id !== payload),
                loadingMaincourse:false
            }
         case MAINCOURSE_ERROR:
            return {
                ...state,
                error: payload,
                loadingMaincourse:false
            }
        default:
            return state;
     }
 }