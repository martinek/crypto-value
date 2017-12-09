import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, HashRouter } from 'react-router-dom';

import store from 'lib/store';

import LayoutContainer from 'components/layout/LayoutContainer';
import Calculator from 'components/Calculator';
import Editor from 'components/Editor';

const App = () => (
    <Provider store={store}>
        <HashRouter>
            <LayoutContainer>
                <Switch>
                    <Route exact path="/edit" component={Editor} />
                    <Route path="/" component={Calculator} />
                </Switch>
            </LayoutContainer>
        </HashRouter>
    </Provider>
);

export default App;
