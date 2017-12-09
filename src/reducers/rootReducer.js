import { combineReducers } from 'redux';

import apiDataReducer from './apiDataReducer';
import userDataReducer from './userDataReducer';

const rootReducer = combineReducers({
    api: apiDataReducer,
    userData: userDataReducer,
});

export default rootReducer;
