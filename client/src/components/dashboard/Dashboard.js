import React, { Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experiences';
import Education from './Education';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ 
    deleteAccount,
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading } 
}) => {
    useEffect(() => {
        getCurrentProfile();
        console.log("sdfsf");
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">
            Dashboard
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name }
        </p>
        {profile!==null ? (
        <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
        </Fragment>
        ) : (
        <Fragment>
            <p>You have not yet setup profile, please add some info</p>
            <Link to='/create-profile' className="btn btn-primary">
                Create Profile
            </Link>
        </Fragment>
        )}
            
        <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus"></i>
                &nbsp;&nbsp;Delete My Account
            </button>
        </div>
    </Fragment>;
};

Dashboard.propTypes={
    getCurrentProfile: propTypes.func.isRequired,
    deleteAccount:propTypes.func.isRequired,
    auth:propTypes.object.isRequired,
    profile:propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth:state.auth,
    profile:state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);