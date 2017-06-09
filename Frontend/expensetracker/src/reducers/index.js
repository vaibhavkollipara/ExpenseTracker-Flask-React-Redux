import {combineReducers} from 'redux';
import ExpensesReducer from './reducer-expenses';

const allReducers = combineReducers(
    {
        items : ExpensesReducer,
    }
);


export default allReducers;
