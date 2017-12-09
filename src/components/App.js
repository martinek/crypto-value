import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'lib/store';
import { HashRouter, Route } from 'react-router-dom';

import LayoutContainer from 'components/layout/LayoutContainer';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <Route path="/" component={LayoutContainer} />
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
