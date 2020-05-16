import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import axios from 'axios';
import thunk from "redux-thunk";
import GLOBAL from '../utils/constants' 

const client = axios.create({
    baseURL: GLOBAL.MOVIEDB_URL,
    responseType: 'json'
});

export default store = createStore(rootReducer, applyMiddleware(thunk))