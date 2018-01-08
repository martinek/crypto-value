import ActionTypes from 'constants/ActionTypes';

const initialState = {
    exchange: null,
};

const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.USER.SET_DATA: {
            return Object.assign({}, state, action.payload);
        }
        default: {
            return state;
        }
    }
};

export default userDataReducer;
