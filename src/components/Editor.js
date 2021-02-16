import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import ActionTypes from 'constants/ActionTypes';
import CardHeader from './CardHeader';

import ItemForm from './editor/ItemForm';
import BackupInfo from './BackupInfo';

class Editor extends Component {
    constructor() {
        super();

        this.handleItemAdd = this.handleItemAdd.bind(this);
    }

    componentDidMount() {
        if (location.href.split('#')[1]) {
            this.showBackupInfo();
        }
    }

    updateData(update) {
        this.props.saveUserData(Object.assign(this.data(), update));
    }

    data(key, def) {
        const data = this.props.userData;
        return (key ? get(data, key) : data) || def;
    }

    handleChange(key, value) {
        const update = {[key]: value};
        this.updateData(update);
    }

    handleItemChange(index, item) {
        this.updateData(update(this.data(), {
            items: { $splice: [[index, 1, item]] },
        }));
    }

    handleItemAdd() {
        const item = { amount: '0', fSym: '' };
        this.updateData({items: (this.data('items') || []).concat([item])});
    }

    handleItemRemove(index) {
        this.updateData(update(this.data(), {
            items: { $splice: [[index, 1]] },
        }));
    }

    showBackupInfo() {
        modal(
            <BackupInfo userData={this.data()} saveUserData={this.props.saveUserData} />
        );
    }

    render() {
        return (
            <div className="card editor-card">
                <CardHeader back={true}>
                    <a className="card-header-icon has-text-primary" onClick={() => this.showBackupInfo()}>
                        <span className="icon">
                            <span className="fas fa-download" />
                        </span>
                    </a>
                </CardHeader>
                <div className="card-content">
                    <div className="field">
                        <label className="label">Display symbol</label>
                        <p className="control">
                            <input 
                                type="text" 
                                className="input is-fullwidth" 
                                value={this.data('tSym', '')} 
                                onChange={e => this.handleChange('tSym', e.target.value)} 
                            />
                        </p>
                    </div>
                    <hr />
                    <label className="label">
                        Holding
                    </label>
                    {this.data('items', []).map((item, i) => 
                        (<ItemForm 
                            key={i} 
                            item={item} 
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
    userData: PropTypes.object,

    saveUserData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    userData: state.userData,
});

const mapDispatchToProps = (dispatch) => ({
    saveUserData: (data) => dispatch({payload: data, type: ActionTypes.USER.SET_DATA}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
