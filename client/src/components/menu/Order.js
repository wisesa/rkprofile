import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Appetizer from './Appetizer';
import Maincourse from './Maincourse';
import MenuItem from './MenuItem';
import Dessert from './Dessert';
import {connect} from 'react-redux';
import {getAppetizers} from '../../actions/menu';
import {getMaincourses} from '../../actions/menu';
import {getDesserts} from '../../actions/menu';
import { getMenu } from '../../actions/menu';
import dessert from '../../reducers/dessert';
import axios from 'axios';

const Order = (

    {
        getAppetizers, appetizer: {appetizers, loadingAppetizer},
        getMaincourses, maincourse: {maincourses, loadingMaincourse},
        getDesserts, dessert: {desserts, loadingDessert},
        getMenu, menu:{menus, loadingMenu}
    }
    ) => {

        const onSubmit = async e => {
          e.preventDefault();
          const formData = new FormData();

          let totalPrice=0;

          for(let i=0;i<appetizers.length;i++){
            formData.append('chk', (cartAppetizer[i].id+"|"+cartAppetizer[i].name+"|"+cartAppetizer[i].price+"|"+cartAppetizer[i].amount));
            if(cartAppetizer[i].amount>0)
              totalPrice=totalPrice+(parseInt(cartAppetizer[i].price*cartAppetizer[i].amount));
          }

          for(let i=0;i<maincourses.length;i++){
            formData.append('chk', (cartMaincourse[i].id+"|"+cartMaincourse[i].name+"|"+cartMaincourse[i].price+"|"+cartMaincourse[i].amount));
            if(cartMaincourse[i].amount>0)
              totalPrice=totalPrice+(parseInt(cartMaincourse[i].price*cartMaincourse[i].amount));
          }

          for(let i=0;i<desserts.length;i++){
            formData.append('chk', (cartDessert[i].id+"|"+cartDessert[i].name+"|"+cartDessert[i].price+"|"+cartDessert[i].amount));
            if(cartDessert[i].amount>0)
              totalPrice=totalPrice+(parseInt(cartDessert[i].price*cartDessert[i].amount));
          }
          
          formData.append('total', totalPrice);

          try {
            const res = await axios.post('/api/transaction', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            const id = res.data;

            window.location = `/print/${res.data}`;
          } catch (err) {
            console.log(err);
          }
        };
      
        const [minimizeChart, setMinimizeChart] = useState([]);
        const [maximizeChart, setMaximizeChart] = useState(['none']);
        const [totalCart, setTotalCart] = useState([0]);
        const [totalPrice, setTotalPrice] = useState([0]);

        const checkCart = (event) => {
          event.preventDefault();
        };
      
        //Cart Appetizer
        const [cartAppetizer, setCartAppetizer] = useState([]);
        const addAppetizer = (event,index,id,name,price) => {
          event.preventDefault();

          cartAppetizer[index].id=id;
          cartAppetizer[index].name=name;
          cartAppetizer[index].price=price;
          cartAppetizer[index].amount=cartAppetizer[index].amount+1;
          setCartAppetizer(cartAppetizer);
          setTotalCart(parseInt(totalCart+1));

          //Set Total Price
          setTotalPrice(parseInt(totalPrice)+parseInt((cartAppetizer[index].price)));
        };
      
        const decreaseAppetizer = (event, index) => {
          event.preventDefault();
          if(cartAppetizer[index].amount>0){
            cartAppetizer[index].amount=cartAppetizer[index].amount-1;
            setCartAppetizer(cartAppetizer);
            setTotalCart(parseInt(totalCart-1));

            //Decrease Total Price
            setTotalPrice(parseInt(totalPrice-cartAppetizer[index].price));
          }
        };

        //Cart Maincourse
        const [cartMaincourse, setCartMaincourse] = useState([]);
        const addMaincourse = (event,index,id,name,price) => {
          event.preventDefault();
          console.log('Add '+index);
          cartMaincourse[index].id=id;
          cartMaincourse[index].name=name;
          cartMaincourse[index].price=price;
          cartMaincourse[index].amount=cartMaincourse[index].amount+1;
          setCartMaincourse(cartMaincourse);
          setTotalCart(parseInt(totalCart+1));

          //Set Total Price
          setTotalPrice(parseInt(totalPrice)+parseInt((cartMaincourse[index].price)));
        };
      
        const decreaseMaincourse = (event, index) => {
          event.preventDefault();
          if(cartMaincourse[index].amount>0){
            cartMaincourse[index].amount=cartMaincourse[index].amount-1;
            setCartMaincourse(cartMaincourse);
            setTotalCart(parseInt(totalCart-1));

            //Decrease Total Price
            setTotalPrice(parseInt(totalPrice-cartMaincourse[index].price));
          }
        };

        //Cart Dessert
        const [cartDessert, setCartDessert] = useState([]);
        const addDessert = (event,index,id,name,price) => {
          event.preventDefault();
          console.log('Add '+index);
          cartDessert[index].id=id;
          cartDessert[index].name=name;
          cartDessert[index].price=price;
          cartDessert[index].amount=cartDessert[index].amount+1;
          setCartDessert(cartDessert);
          setTotalCart(parseInt(totalCart+1));

          //Set Total Price
          setTotalPrice(parseInt(totalPrice)+parseInt((cartDessert[index].price)));
        };
      
        const decreaseDessert = (event, index) => {
          event.preventDefault();
          if(cartDessert[index].amount>0){
            cartDessert[index].amount=cartDessert[index].amount-1;
            setCartDessert(cartDessert);
            setTotalCart(parseInt(totalCart-1));

            //Decrease Total Price
            setTotalPrice(parseInt(totalPrice-cartDessert[index].price));
          }
        };

    useEffect(()=>{
        getAppetizers();

        if(!loadingAppetizer){
          for(let i=0;i<appetizers.length;i++){
            const appetizer = {
              id: 0,
              amount: 0
            };
            cartAppetizer.push(appetizer)
          }
        }
        //console.log(appetizers.length);

    }, [loadingAppetizer, getAppetizers]);

    useEffect(()=>{
        getMaincourses();

        if(!loadingMaincourse){
          for(let i=0;i<maincourses.length;i++){
            const maincourse = {
              id: 0,
              amount: 0
            };
            cartMaincourse.push(maincourse)
          }
        }

        //console.log(maincourses.length);
    }, [loadingMaincourse, getMaincourses]);

    useEffect(()=>{
      getDesserts();

      if(!loadingDessert){
        for(let i=0;i<desserts.length;i++){
          const dessert = {
            id: 0,
            amount: 0
          };
          cartDessert.push(dessert)
        }
      }
      //console.log(desserts.length);
    }, [loadingDessert, getDesserts]);

    useEffect(() => {
      getMenu("60ca12ffed908ca010a3e7c2"); //dummy data
    
    }, [loadingMenu, getMenu]);

    return loadingAppetizer || loadingMaincourse || loadingDessert || loadingMenu ? (
        <Spinner />
    ) : (
        <Fragment>
          <form onSubmit={onSubmit}>
            <div className="row d-flex flex-column-xl justify-content-center mt-5">
                <div className="appetizers d-flex flex-column align-items-center center m-2">
                    <div className="d-flex justify-content-between mt-5">
                        <h2 className="dish-type mr-3">Appetizer</h2>
                    </div>
                    {appetizers.map((appetizer,index) => (
                      <div className="menu bg-white d-flex align-items-center">
                        <div>
                          <img className="img-menu" src={`https://mighty-reef-58921.herokuapp.com/menu/appetizer.png`} />
                        </div>
                        <div className="price">
                          <div>
                            <h3>
                              {appetizer.name}
                            </h3>
                            <h3>
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(appetizer.price)}
                            </h3>
                          </div>
                        </div>
                        <div className="center">
                          <h3 className="my-1">
                          <input type="hidden" id={"maincourse-"+index} name="chk[]" 
                            value={(cartAppetizer[index] ? (cartAppetizer[index].amount>0 ? appetizer._id+"|"+appetizer.name+"|"+appetizer.price+"|"+appetizer.amount : '' ) : '')} />
                            <button onClick={(event) => addAppetizer(event,index,appetizer._id,appetizer.name,appetizer.price)}
                                type="button"
                                className="btn btn-danger mr-2">
                                    {<i className="fas fa-plus"></i>}
                            </button>
                            <button onClick={(event) => decreaseAppetizer(event,index)}
                                type="button"
                                className="btn btn-danger">
                                    {<i className="fas fa-minus"></i>}
                            </button>
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="maincourses d-flex flex-column align-items-center center m-2">
                    <div className="d-flex justify-content-between mt-5">
                        <h2 className="dish-type mr-3">Main Course</h2>
                    </div>
                    {maincourses.map((maincourse,index) => (
                      <div className="menu bg-white d-flex align-items-center">
                        <div>
                          <img className="img-menu" src={`https://mighty-reef-58921.herokuapp.com/menu/main-course.png`} />
                        </div>
                        <div className="price">
                          <div>
                            <h3>
                              {maincourse.name}
                            </h3>
                            <h3>
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(maincourse.price)}
                            </h3>
                          </div>
                        </div>
                        <div className="center">
                          <h3 className="my-1">
                          <input type="hidden" id={"maincourse-"+index} name="chk[]" 
                            value={(cartMaincourse[index] ? (cartMaincourse[index].amount>0 ? maincourse._id+"|"+maincourse.name+"|"+maincourse.price+"|"+maincourse.amount : '' ) : '')} />
                            <button onClick={(event) => addMaincourse(event,index,maincourse._id,maincourse.name,maincourse.price)}
                                type="button"
                                className="btn btn-danger mr-2">
                                    {<i className="fas fa-plus"></i>}
                            </button>
                            <button onClick={(event) => decreaseMaincourse(event,index)}
                                type="button"
                                className="btn btn-danger">
                                    {<i className="fas fa-minus"></i>}
                            </button>
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="desserts d-flex flex-column align-items-center center m-2">
                    <div className="d-flex justify-content-between mt-5">
                        <h2 className="dish-type mr-3">Dessert</h2>
                    </div>
                    {desserts.map((dessert,index) => (
                      <div className="menu bg-white d-flex align-items-center">
                        <div>
                          <img className="img-menu" src={`https://mighty-reef-58921.herokuapp.com/menu/dessert.png`} />
                        </div>
                        <div className="price">
                          <div>
                            <h3>
                              {dessert.name}
                            </h3>
                            <h3>
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(dessert.price)}
                            </h3>
                          </div>
                        </div>
                        <div className="center">
                          <h3 className="my-1">
                            <input type="hidden" id={"dessert-"+index} name="chk[]" 
                            value={(cartDessert[index] ? (cartDessert[index].amount>0 ? dessert._id+"|"+dessert.name+"|"+dessert.price+"|"+dessert.amount : '' ) : '')} />
                            <button onClick={(event) => addDessert(event,index,dessert._id,dessert.name,dessert.price)}
                                type="button"
                                className="btn btn-danger mr-2">
                                    {<i className="fas fa-plus"></i>}
                            </button>
                            <button onClick={(event) => decreaseDessert(event,index)}
                                type="button"
                                className="btn btn-danger">
                                    {<i className="fas fa-minus"></i>}
                            </button>
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            <div className={"d-flex justify-content-center cart-mini "+minimizeChart} onClick={(event) => setMaximizeChart('')}>
              <div className="lbl-cart mr-3">
                {totalCart}
              </div>
              <img className="img-cart" src="/img/cart.png" />
            </div>
            <div className={"cart "+maximizeChart}>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 center mb-4"></div>
                    <div className="col-lg-4 col-md-4 col-sm-4 center mb-4"><h3>My Cart</h3></div>
                    <div className="col-lg-4 col-md-4 col-sm-4 right mb-4">
                      <div className="lbl-x" onClick={(event) => setMaximizeChart('none')}>x</div>
                    </div>
                    
                    {appetizers.map((appetizer,index) => (
                      (!cartAppetizer[index] ? null : (<div className={"col-lg-12 "+(cartAppetizer[index].amount>0 ? null : "none")}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 left">{appetizer.name}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 center">{cartAppetizer[index] ? 'x '+cartAppetizer[index].amount : 'x 0'}</div>
                            <div className="col-lg-4 col-md-4 col-sm-4 right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(appetizer.price)}</div>
                          </div>
                        </div>))
                    ))}
                    {maincourses.map((maincourse,index) => (
                      (!cartMaincourse[index] ? null : (<div className={"col-lg-12 "+(cartMaincourse[index].amount>0 ? null : "none")}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 left">{maincourse.name}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 center">{cartMaincourse[index] ? 'x '+cartMaincourse[index].amount : 'x 0'}</div>
                            <div className="col-lg-4 col-md-4 col-sm-4 right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(maincourse.price)}</div>
                          </div>
                        </div>))
                    ))}
                    {desserts.map((dessert,index) => (
                      (!cartDessert[index] ? null : (<div className={"col-lg-12 "+(cartDessert[index].amount>0 ? null : "none")}>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 left">{dessert.name}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 center">{cartDessert[index] ? 'x '+cartDessert[index].amount : 'x 0'}</div>
                            <div className="col-lg-4 col-md-4 col-sm-4 right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(dessert.price)}</div>
                          </div>
                        </div>
                      ))
                    ))}

                    <div className="col-lg-6 col-md-6 col-sm-6 mt-3">Total</div>
                    <div className="col-lg-2 col-md-2 col-sm-2 mt-3"></div>
                    <div className="col-lg-4 col-md-4 col-sm-4 mt-3 right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice)}</div>
                    
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8 center mb-4">
                      <input
                        type='submit'
                        value='PURCHASE'
                        className='btn btn-primary mt-4'
                      />
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
            </div>
            </form>
        </Fragment>
    );
};

Order.propTypes = {
    getAppetizers: propTypes.func.isRequired,
    getMaincourses: propTypes.func.isRequired,
    getDesserts: propTypes.func.isRequired,
    getMenu: propTypes.func.isRequired,
    menu: propTypes.object.isRequired,
    appetizer: propTypes.object.isRequired,
    maincourse: propTypes.object.isRequired,
    dessert: propTypes.object.isRequired
}

const mapStateToProps= state => ({
    appetizer: state.appetizer,
    maincourse: state.maincourse,
    dessert: state.dessert,
    menu:state.menu
});

export default connect(mapStateToProps, {getAppetizers,getMaincourses,getDesserts,getMenu})(Order);