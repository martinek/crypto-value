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
import BackupInfo from './BackupInfo';

class Editor extends Component {
    constructor() {
        super();

        this.handleItemAdd = this.handleItemAdd.bind(this);
    }

    componentDidMount() {
        if (!this.props.exchanges) {
            this.fetchExchanges();
        }

        if (location.href.split('#')[1]) {
            this.showBackupInfo();
        }
    }

    updateData(update) {
        this.props.saveUserData(Object.assign(this.data(), update));
    }

    data(key, def) {
        const data = this.props.userData;
        return (key ? _.get(data, key) : data) || def;
    }

    handleChange(key, value) {
        const update = {[key]: value};
        if (key === 'exchange') {
            // When exchange is changed, make sure new exchange has selected 
            // display symbol available. If not, select first available

            const newEx = this.getExchange(value);
            const tSyms = this.tSyms(newEx);
            if (!_.includes(tSyms, this.data('tSym'))) {
                update.tSym = tSyms[0];
            }
        }
        this.updateData(update);
    }

    handleItemChange(index, item) {
        this.updateData(update(this.data(), {
            items: { $splice: [[index, 1, item]] },
        }));
    }

    handleItemAdd() {
        const item = {
            amount: '0',
            fSym: this.fSyms()[0],
        };
        this.updateData({items: this.data('items').concat([item])});
    }

    handleItemRemove(index) {
        this.updateData(update(this.data(), {
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
        return this.getExchange(this.data('exchange'));
    }

    fSyms(exchange = this.currentExchange()) {
        const tSym = this.data('tSym');
        if (tSym === '') return [];

        return exchange ?
            _.keys(exchange)
                .sort()
                .filter(k => exchange[k].includes(tSym)) 
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

    showBackupInfo() {
        modal(
            <BackupInfo userData={this.data()} saveUserData={this.props.saveUserData} />
        );
    }

    render() {
        const tSyms = this.tSyms();

        return (
            <div className="card editor-card">
                {/* <div className={'modal is-active'}>
                    <div className="modal-background"/>
                    <div className={'modal-content'}>
                        <BackupInfo />
                    </div>
                </div> */}
                
                <CardHeader back={true}>
                    <a className="card-header-icon has-text-primary" onClick={() => this.showBackupInfo()}>
                        <span className="icon">
                            <span className="fas fa-download" />
                        </span>
                    </a>
                </CardHeader>
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
                                <select value={this.data('exchange', '')} onChange={e => this.handleChange('exchange', e.target.value)}>
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
                                <select value={this.data('tSym', '')} onChange={e => this.handleChange('tSym', e.target.value)}>
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
                                exchangeName={this.data('exchange')} 
                                trades={this.currentExchange()} 
                                tSyms={tSyms}
                                tSym={this.data('tSym')} 
                            />
                        )}>
                            <span className="fas fa-info-circle" />
                        </a>
                    </label>
                    {this.data('items', []).map((item, i) => 
                        (<ItemForm 
                            key={i} 
                            item={item} 
                            dSym={this.data('tSym', '')}
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
                            <input className="input has-text-right" type="number" value={this.data('investment', '0')} onChange={e => this.handleChange('investment', e.target.value)} />
                        </p>
                        <p className="control">
                            <a className="button is-static">
                                {this.data('tSym', '')}
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
