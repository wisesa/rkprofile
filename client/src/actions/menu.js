import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_APPETIZERS,
    GET_APPETIZER,
    DELETE_APPETIZER,
    APPETIZER_ERROR,
    GET_MAINCOURSES,
    GET_MAINCOURSE,
    DELETE_MAINCOURSE,
    MAINCOURSE_ERROR,
    GET_DESSERTS,
    GET_DESSERT,
    DELETE_DESSERT,
    DESSERT_ERROR,
    GET_MENUS,
    GET_MENU,
    MENU_ERROR,
    DELETE_MENU,
    ADD_MENU,
    EDIT_MENU,
    REMOVE_MENU
} from './types';

// Get posts
export const getMenus = () => async dispatch => {
    try {
        const res=await axios.get('/api/menu/list/');

        dispatch({
            type:GET_MENUS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type: MENU_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete post
export const deleteMenu = id => async dispatch => {
    try {
        const res=await axios.delete(`/api/menu/${id}`);

        dispatch({
            type:DELETE_MENU,
            payload:id
        });

        dispatch(setAlert('Menu Removed', 'success'));
    } catch (err) {
        dispatch({
            type: MENU_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get Appetizers
export const getAppetizers = () => async dispatch => {
    try {
        const res=await axios.get('/api/menu/list/1');

        dispatch({
            type:GET_APPETIZERS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type: MENU_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get post
export const getAppetizer = id => async dispatch => {
    try {
        const res=await axios.get(`/api/menu/load/${id}`);
        //console.log(res.data);

        dispatch({
            type:GET_APPETIZER,
            payload:res.data
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: MENU_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Appetizer
export const deleteAppetizer = id => async dispatch => {
    try {
        const res=await axios.delete(`/api/menu/${id}`);

        dispatch({
            type:DELETE_APPETIZER,
            payload:id
        });

        dispatch(setAlert('Menu Removed', 'success'));
    } catch (err) {
        dispatch({
            type: APPETIZER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get Maincourses
export const getMaincourses = () => async dispatch => {
    try {
        const res=await axios.get('/api/menu/list/2');

        dispatch({
            type:GET_MAINCOURSES,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type: MENU_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Maincourse
export const deleteMaincourse = id => async dispatch => {
    try {
        const res=await axios.delete(`/api/menu/${id}`);

        dispatch({
            type:DELETE_MAINCOURSE,
            payload:id
        });

        dispatch(setAlert('Menu Removed', 'success'));
    } catch (err) {
        dispatch({
            type: MAINCOURSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get Desserts
export const getDesserts = () => async dispatch => {
    try {
        const res=await axios.get('/api/menu/list/3');

        dispatch({
            type:GET_DESSERTS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type: MENU_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Dessert
export const deleteDessert = id => async dispatch => {
    try {
        const res=await axios.delete(`/api/menu/${id}`);

        dispatch({
            type:DELETE_DESSERT,
            payload:id
        });

        dispatch(setAlert('Menu Removed', 'success'));
    } catch (err) {
        dispatch({
            type: DESSERT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get post
export const getMenu = id => async dispatch => {
    try {
        const res=await axios.get(`/api/menu/load/${id}`);
        //console.log(res.data);

        dispatch({
            type:GET_MENU,
            payload:res.data
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: MENU_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add menu
export const addMenu = formData => async dispatch => {
    const config={
        headers:{
            //'Content-Type': 'application/json'
            'Content-Type': 'multipart/form-data'
        }
    }

    try {
        console.log(formData);
        const res = await axios.post('/api/menu/', formData, config);

        dispatch({
            type:ADD_MENU,
            payload:res.data
        });

        dispatch(setAlert('Menu Created', 'success'));
    } catch (err) {
        dispatch({
            type: MENU_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type:REMOVE_MENU,
            payload:commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: MENU_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}