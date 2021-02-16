import { combineReducers } from 'redux';

import userDataReducer from './userDataReducer';

const rootReducer = combineReducers({
    userData: userDataReducer,
});

export default rootReducer;
