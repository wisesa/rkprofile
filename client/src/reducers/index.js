import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import menu from './menu';
import appetizer from './appetizer';
import maincourse from './maincourse';
import dessert from './dessert';
import transaction from './transaction';
import item from './item';

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    menu,
    appetizer,
    maincourse,
    dessert,
    transaction,
    item
});
