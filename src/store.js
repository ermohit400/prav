import thunk from "redux-thunk";
import getRootReducer from "./reducers";
import logger from 'redux-logger'

import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import AppNavigation from './navigation/AppNavigation'

const navReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}

export default () => {
    const store = createStore(
        getRootReducer(navReducer),
        applyMiddleware(thunk,logger )
    );

    return store;
}