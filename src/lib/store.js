/**
 * This file export a configured and enhanced Redux store. It is then used in a provider.
 *
 * http://redux.js.org/docs/api/Store.html
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/rootReducer';

/**
 * Redux store enhancer
 *
 * Middleware provides a third-party extension point between dispatching an action,
 * and the moment it reaches the reducer.
 * http://redux.js.org/docs/advanced/Middleware.html
 *
 * Redux thunk middleware for ability to have action creators return a function.
 * https://github.com/gaearon/redux-thunk
 *
 * Also connecting with Redux Devtools Extension
 * https://github.com/zalmoxisus/redux-devtools-extension
 *
 */
const isDev = true;

const middlewares = [thunk];
const enhancer = isDev ? compose(
    // Development enhancer
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
) : compose(
    // Production enhancer
    applyMiddleware(...middlewares)
);

/**
 * Creating store
 * Passing rootReducer, initialState and enhancer with applied middlewares.
 */
function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);
    hotReloadReducers(store);
    return store;
}

/**
 * Hot reloading of reducers
 */
function hotReloadReducers(store) {
    if (module.hot && isDev) {
        module.hot.accept('../reducers/rootReducer', () => {
            const nextReducer = require('../reducers/rootReducer').default;
            store.replaceReducer(nextReducer);
        });
    }
}

// Configure and export store
const store = configureStore();
export default store;
