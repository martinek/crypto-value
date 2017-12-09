import update from 'react-addons-update';
import ActionTypes from 'constants/ActionTypes';

const initialState = {
    exchanges: null,
};

const apiDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.API.STORE_EXCHANGES: {
            return update(state, { exchanges: { $set: action.payload } });
        }
        default: {
            return state;
        }
    }
};

export default apiDataReducer;
