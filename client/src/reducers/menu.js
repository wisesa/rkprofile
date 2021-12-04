import { post } from 'request';
import {
    GET_MENUS,
    GET_MENU,
    MENU_ERROR,
    DELETE_MENU,
    ADD_MENU,
    EDIT_MENU
} from '../actions/types';

const initialState = { 
    menus: [],
    menu: null,
    loadingMenu:true,
    error:{}
 }

 export default function (state=initialState, action){
     const {type, payload} = action;

     switch(type){
         case GET_MENUS:
            return {
                ...state,
                menus: payload,
                loadingMenu:false
            }
         case GET_MENU:
            return {
                ...state,
                menu: payload,
                loadingMenu:false
            }
         case ADD_MENU:
            return{
                ...state,
                menus: [payload,...state.menus],
                loadingMenu:false
            }
         case EDIT_MENU:
            return{
                ...state,
                menus: state.menus.filter(menu=>menu._id !== payload),
                loadingMenu:false
            }
         case DELETE_MENU:
            return{
                ...state,
                menus: state.menus.filter(menu=>menu._id !== payload),
                loadingMenu:false
            }
         case MENU_ERROR:
            return {
                ...state,
                error: payload,
                loadingMenu:false
            }
        default:
            return state;
     }
 }