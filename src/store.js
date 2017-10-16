import {createStore, applyMiddleware} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reducer from './ducks/reducer';

let createStoreWithMiddleWare = applyMiddleware(reduxPromiseMiddleware())(createStore);

let store = createStoreWithMiddleWare(reducer);

export default store;
