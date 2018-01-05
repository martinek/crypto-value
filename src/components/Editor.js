import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import DataSource from 'lib/dataSource';
import ActionTypes from 'constants/ActionTypes';
import CardHeader from './CardHeader';

import ExchangeInfo from './editor/ExchangeInfo';
import ItemForm from './editor/ItemForm';

const initialState = {
    exchange: null,
    tSym: null,
    investment: null,
    items: [],
};

class Editor extends Component {
    constructor(props) {
        super();

        this.state = this.stateFromProps(props);

        this.handleItemAdd = this.handleItemAdd.bind(this);
    }

    stateFromProps(props) {
        return Object.assign({}, initialState, props.userData);
    }

    componentWillReceiveProps(props) {
        this.setState(this.stateFromProps(props));
    }

    componentDidMount() {
        if (!this.props.exchanges) {
            this.fetchExchanges();
        }
    }

    componentDidUpdate(){
        this.props.saveUserData(this.state);
    }

    handleChange(key, value) {
        const update = {[key]: value};
        if (key === 'exchange') {
            // When exchange is changed, make sure new exchange has selected 
            // display symbol available. If not, select first available

            const newEx = this.getExchange(value);
            const tSyms = this.tSyms(newEx);
            if (!_.includes(tSyms, this.state.tSym)) {
                update.tSym = tSyms[0];
            }
        }
        this.setState(update);
    }

    handleItemChange(index, item) {
        this.setState(update(this.state, {
            items: { $splice: [[index, 1, item]] },
        }));
    }

    handleItemAdd() {
        const item = {
            amount: '0',
            fSym: this.fSyms()[0],
        };
        this.setState({items: this.state.items.concat([item])});
    }

    handleItemRemove(index) {
        this.setState(update(this.state, {
            items: { $splice: [[index, 1]] },
        }));
    }

    fetchExchanges() {
        DataSource.fetchExchanges();
    }

    getExchange(key) {
        return _.get(this, `props.exchanges[${key}]`, {});
    }

    currentExchange() {
        return this.getExchange(this.state.exchange);
    }

    fSyms(exchange = this.currentExchange()) {
        if (this.state.tSym === '') {
            return [];
        }

        return exchange ?
            _.keys(exchange)
                .sort()
                .filter(k => exchange[k].includes(this.state.tSym)) 
            : [];
    }

    tSyms(exchange = this.currentExchange()) {
        return exchange ?
            _.chain(exchange)
                .values()
                .reduce((acc, tSyms) => acc.concat(tSyms), [])
                .uniq()
                .sort()
                .value() : [];
    }

    render() {
        const tSyms = this.tSyms();

        return (
            <div className="card editor-card">
                <CardHeader back={true} />
                <div className="card-content">
                    <div className="field">
                        <label className="label">
                            Exchange
                            <a 
                                className="is-pulled-right has-text-primary" 
                                title="Reload exchange data"
                                onClick={() => this.fetchExchanges()}>
                                <span className="fas fa-sync" />
                            </a>
                        </label>
                        <p className="control">
                            <span className="select is-fullwidth">
                                <select value={this.state.exchange || ''} onChange={e => this.handleChange('exchange', e.target.value)}>
                                    {_.keys(this.props.exchanges).sort().map(ex => 
                                        <option key={ex} value={ex}>{ex}</option>
                                    )}
                                </select>
                            </span>
                        </p>
                        {!this.props.exchanges && (
                            <p className="help is-info">No exchanges loaded</p>
                        )}
                    </div>

                    <div className="field">
                        <label className="label">Display symbol</label>
                        <p className="control">
                            <span className="select is-fullwidth">
                                <select value={this.state.tSym || ''} onChange={e => this.handleChange('tSym', e.target.value)}>
                                    {tSyms.map(tSym => 
                                        <option key={tSym} value={tSym}>{tSym}</option>
                                    )}
                                </select>
                            </span>
                        </p>
                    </div>
                    <hr />
                    <label className="label">
                        Holding
                        <a className="is-pulled-right has-text-primary" onClick={() => modal(
                            <ExchangeInfo 
                                exchangeName={this.state.exchange} 
                                trades={this.currentExchange()} 
                                tSyms={tSyms}
                                tSym={this.state.tSym} 
                            />
                        )}>
                            <span className="fas fa-info-circle" />
                        </a>
                    </label>
                    {this.state.items.map((item, i) => 
                        (<ItemForm 
                            key={i} 
                            item={item} 
                            fSyms={this.fSyms()} 
                            onChange={item => this.handleItemChange(i, item)} 
                            onRemove={() => this.handleItemRemove(i)} 
                        />)
                    )}
                    <button 
                        className="button is-success" 
                        onClick={this.handleItemAdd}>
                        <span className="icon"> 
                            <span className="fas fa-plus" />
                        </span>
                    </button>
                    <hr />
                    <label className="label">Total investment</label>
                    <div className="field has-addons is-fullwidth">
                        <p className="control is-expanded">
                            <input className="input has-text-right" type="number" value={this.state.investment || '0'} onChange={e => this.handleChange('investment', e.target.value)} />
                        </p>
                        <p className="control">
                            <a className="button is-static">
                                {this.state.tSym || ''}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    exchanges: PropTypes.object,
    userData: PropTypes.object,

    saveUserData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    exchanges: state.api.exchanges,
    userData: state.userData,
});

const mapDispatchToProps = (dispatch) => ({
    saveUserData: (data) => dispatch({payload: data, type: ActionTypes.USER.SET_DATA}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
