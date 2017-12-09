import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import DataSource from 'lib/dataSource';
import ActionTypes from 'constants/ActionTypes';
import CardHeader from './CardHeader';

const ItemForm = ({fSyms, item, onChange, onRemove}) => {
    const handleChange = (key, value) => {
        onChange(Object.assign(item, {[key]: value}));
    };

    return (
        <div className="field has-addons">
            <p className="control">
                <button className="button is-danger" onClick={onRemove}>
                    <span className="icon">
                        <span className="fas fa-minus fa-sm" />
                    </span>
                </button>
            </p>
            <p className="control">
                <input 
                    className="input has-text-right" 
                    value={item.amount || 0} 
                    type="number" 
                    placeholder="Amount" 
                    onChange={e => handleChange('amount', e.target.value)} 
                />
            </p>
            <p className="control">
                <span className="select">
                    <select value={item.fSym} onChange={e => handleChange('fSym', e.target.value)}>
                        {fSyms.sort().map(fSym => 
                            <option key={fSym} value={fSym}>{fSym}</option>
                        )}
                    </select>
                </span>
            </p>
        </div>
    );
};
ItemForm.propTypes = {
    fSyms: PropTypes.array,
    item: PropTypes.object,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
};

class Editor extends Component {
    constructor(props) {
        super();
        
        this.changed = false;
        this.state = Object.assign({
            exchange: '',
            tSym: '',
            investment: '',
            items: [],
        }, props.userData);

        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        if (!this.props.exchanges) {
            this.fetchExchanges();
        }
    }

    fetchExchanges() {
        DataSource.fetchExchanges();
    }

    handleAddItem() {
        const item = {
            amount: '0',
            fSym: this.fSyms()[0],
        };
        this.setState({items: this.state.items.concat([item])});
        this.changed = true;
    }

    handleChange(key, value) {
        this.setState({[key]: value});
        this.changed = true;
    }

    handleItemChange(index, item) {
        this.setState(update(this.state, {
            items: { $splice: [[index, 1, item]] },
        }));
        this.changed = true;
    }

    handleItemRemove(index) {
        this.setState(update(this.state, {
            items: { $splice: [[index, 1]] },
        }));
        this.changed = true;
    }

    handleSave() {
        this.props.saveUserData(this.state);
        this.changed = false;
        this.forceUpdate();
    }

    currentExchange() {
        return _.get(this, `props.exchanges[${this.state.exchange}]`, {});
    }

    fSyms() {
        const exchange = this.currentExchange();
        return exchange ?
            _.keys(exchange).sort() : [];
    }

    tSyms() {
        const exchange = this.currentExchange();
        return exchange ?
            _.chain(exchange)
                .values()
                .reduce((acc, tSyms) => acc.concat(tSyms), [])
                .uniq()
                .sort()
                .value() : [];
    }

    render() {
        return (
            <div className="card editor-card">
                <CardHeader>
                    <a 
                        className="card-header-icon has-text-primary" 
                        title="Reload exchange data"
                        onClick={() => this.fetchExchanges()}>
                        <span className="icon">
                            <span className="fas fa-sync" />
                        </span>
                    </a>
                    {this.changed && (
                        <a className="card-header-icon has-text-primary" onClick={this.handleSave}>
                            <span className="icon">
                                <span className="fas fa-save" />
                            </span>
                        </a>
                    )}
                </CardHeader>
                <div className="card-content">
                    <div className="field">
                        <label className="label">Exchange</label>
                        <p className="control">
                            <span className="select is-fullwidth">
                                <select value={this.state.exchange || ''} onChange={e => this.handleChange('exchange', e.target.value)}>
                                    {_.keys(this.props.exchanges).sort().map(ex => 
                                        <option key={ex} value={ex}>{ex}</option>
                                    )}
                                </select>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Display symbol</label>
                        <p className="control">
                            <span className="select is-fullwidth">
                                <select value={this.state.tSym || ''} onChange={e => this.handleChange('tSym', e.target.value)}>
                                    {this.tSyms().map(tSym => 
                                        <option key={tSym} value={tSym}>{tSym}</option>
                                    )}
                                </select>
                            </span>
                        </p>
                    </div>
                    <hr />
                    <label className="label">Holding</label>
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
                        onClick={this.handleAddItem}>
                        <span className="icon"> 
                            <span className="fas fa-plus" />
                        </span>
                    </button>
                    <hr />
                    <label className="label">Bought for</label>
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
