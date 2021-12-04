import React, { Fragment,useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Ladmin from './components/layout/Ladmin';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import AddMenu from './components/menu-form/AddMenu';
import EditMenu from './components/menu-form/EditMenu';
import Temp from './components/menu-form/Temp';
import Menus from './components/menu/Menus';
import Order from './components/menu/Order';
import Transactions from './components/transaction/Transactions';
import Menu from './components/menu/MenuItem';
import PrivateRoute from './components/routing/PrivateRoute';
import Print from './components/transaction/Print';
import Spinner from './components/layout/Spinner';

//Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './public/bootstrap.min.css';
import './public/style.css';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

function loadError(onError) {
    console.error(`Failed ${onError.target.src} didn't load correctly`);
  }

const App = () => {
    useEffect(()=>{
        //store.dispatch(loadUser());
    },[]);

    return !Landing ? (
        <Spinner />
    ) : (
    <Provider store={store}>
        <Router>
            <Fragment>
      
                <Navbar />
                    <Alert />
                        <Switch>
                                <Route exact path="/" component={Landing} />
                                {/* <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/order" component={Order} />
                                <Route exact path="/print/:id" component={Print} />
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                <PrivateRoute exact path="/addmenu" component={AddMenu} />
                                <PrivateRoute exact path="/editmenu/:id" component={EditMenu} />
                                <PrivateRoute exact path="/menus" component={Menus} />
                                <PrivateRoute exact path="/transactions" component={Transactions} />
                                <PrivateRoute exact path="/menus/:id" component={Menu} /> */}
                        </Switch>
            </Fragment>

        </Router>
    </Provider> 
)};

export default App;