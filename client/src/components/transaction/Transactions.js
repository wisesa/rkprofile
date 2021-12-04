import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Transaction from './TransactionItem';
import {connect} from 'react-redux';
import { getTransactions } from '../../actions/transactions';
import Pagination from "react-js-pagination";

const Transactions = (
    {
        getTransactions, transaction: {transactions, loading}
    }
    ) => {
        const [todos, setTodos] = useState(transactions);
        const [currentPage, setCurrentPage] = useState();
        const [todosPerPage, setTodosPerPage] = useState();
        const [currentTodos, setCurrentTodos] = useState([]);

        // Logic for displaying todos
        const getCurrentTodos = () => {
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            setCurrentTodos(todos.slice(indexOfFirstTodo, indexOfLastTodo))
        }

        let count=0;
        let thisPage=1;
        const renderTodos = currentTodos.map((transaction) => {
            if(thisPage!=currentPage){
                count=count+1+((currentPage-1)*todosPerPage);
                thisPage=currentPage;
            }else{
                count=count+1;
            }
            //count=count+1+((thisPage-1)*todosPerPage);
            //console.log(thisPage+" "+currentPage)
            return <Transaction key={transaction._id} transaction={transaction} count={count} />;
        });

        const handlePageChange = (pageNumber) => {
            //console.log(`active page is ${pageNumber}`);
            setCurrentPage(pageNumber);
        }

        //console.log(todos)
        useEffect(()=>{
            getTransactions();
            setCurrentPage(1);
            setTodosPerPage(10);
            setTodos(transactions);
        }, [loading, getTransactions]);

        useEffect(()=>{
            getCurrentTodos();
        }, [todos]);

        useEffect(()=>{
            getCurrentTodos();
        }, [currentPage]);

        return loading ? (
            <Spinner />
        ) : (
            <Fragment>
                <div className="d-flex justify-content-around mt-5">
                    <div className="transactions mt-5">
                        <div className="sub-trans top-trans center mt-3">
                            <div>
                                <h4 class="white">No</h4>
                            </div>
                            <div>
                                <h4 class="white">Transaction Number</h4>
                            </div>
                            <div>
                                <h4 class="white">Total Price</h4>
                            </div>
                            <div>
                                <h4 class="white">Date Transaction</h4>
                            </div>
                        </div>
                        {renderTodos}
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={todosPerPage}
                totalItemsCount={todos.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                />
                </div>
            </Fragment>
        );
};

Transactions.propTypes = {
    getTransactions: propTypes.func.isRequired,
    transaction: propTypes.object.isRequired
}

const mapStateToProps= state => ({
    transaction: state.transaction
});

export default connect(mapStateToProps, {getTransactions})(Transactions);