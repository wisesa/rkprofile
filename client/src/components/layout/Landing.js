import React, {Fragment, useState, useEffect} from "react";
import {Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {login} from '../../actions/auth';

const Landing=({login,isAuthenticated})=>{

    return <Fragment>
            <main id="transcroller-body" className="aos-all" >
            <section id="hero" className="d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center" data-aos="fade-down">
                            <img src="/img/konde.png" className="img-hero img-fluid animated" alt="" />
                        </div>
                        <div className="col-lg-12 d-flex justify-content-center mb-5" data-aos="fade-down">
                            <img src="/img/rini-text.png" className="img-rini-text" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="about">
                <div className="container">
                    <div className="section-title">
                        <img className="img-photos" src="/img/aboutme.png" />
                    </div>

                    <div className="row content">
                        <div className="col-lg-6 center-sm right-md container" data-aos="fade-right">
                            <img className="img-red-blue" src="/img/red-blue.png" />
                        </div>

                        <div className="col-lg-6 card-purple mt-5">
                            <div className="member d-flex flex-column align-items-center" data-aos="fade-up">
                                <p className="p-3">
                                    <b>I'm grateful</b> to be happy wife.  You have changed my life by coming into my world. Now, my heart doesn’t belong to me, it’s you and your love that makes me happy.
                                    The best feeling in the world is realizing that you’re my husband. Thanks for lifting my spirits simply with a smile and making my every day worth living.
                                    My dear husband, thank you for being the guiding light when life threw me in the darkest of corners.
                                    I cannot rank you as a husband because no rate card in this world has numbers going up to infinity. Thanks for being the best.
                                    Loving you is the sweetest thing to do. Thank you for everything.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="photos" className="services">
                <div className="container">
                    <div className="section-title">
                        <img className="img-photos" src="/img/photos.png" />
                    </div>

                    <div className="row content">
                        <div className="col-lg-4 col-md-6 center mt-5">
                            <img className="img-pic" src="/img/pic1.jpeg" />
                        </div>
                        <div className="col-lg-4 col-md-6 center mt-5">
                            <img className="img-pic" src="/img/pic2.jpeg" />
                        </div>
                        <div className="col-lg-4 col-md-6 center mt-5">
                            <img className="img-pic" src="/img/pic3.jpeg" />
                        </div>
                        <div className="col-lg-4 col-md-6 center mt-5">
                            <img className="img-pic" src="/img/pic4.jpg" />
                        </div>
                        <div className="col-lg-4 col-md-6 center mt-5">
                            <img className="img-pic" src="/img/pic5.jpg" />
                        </div>
                        <div className="col-lg-4 col-md-6 center mt-5">
                            <img className="img-pic" src="/img/pic6.jpg" />
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer id="footer">
            <div className="container footer-bottom clearfix center">
                <div className="copyright">
                    © Copyright 2021 Rinka's Team All Rights Reserved
                </div>
            </div>
        </footer>

    </Fragment>
}

Landing.propTypes={
    login:propTypes.func.isRequired,
    isAuthenticated:propTypes.bool
};

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, 
    {login})
    (Landing);