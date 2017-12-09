import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import store from 'lib/store';
import modal from 'lib/modal';

import LayoutContainer from 'components/layout/LayoutContainer';
import Calculator from 'components/Calculator';
import Editor from 'components/Editor';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <LayoutContainer>
                <Switch>
                    <Route exact path="/edit" component={Editor} />
                    <Route path="/" component={Calculator} />
                </Switch>
            </LayoutContainer>
        </BrowserRouter>
    </Provider>
);

export default App;
