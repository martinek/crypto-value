import React, { Component } from 'react';
import PropTypes from 'prop-types';

import dataSource from 'lib/dataSource';

class BackupInfo extends Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleImport = this.handleImport.bind(this);

        const linkData = location.href.split('#')[1];

        this.state = {
            data: linkData ? atob(linkData) : dataSource.serializeUserData(props.userData),
        };
    }

    componentWillReceiveProps(newProps) {
        console.log('BIProps', newProps);
        this.setState({
            data: dataSource.serializeUserData(newProps.userData),
        });
    }

    dataChanged() {
        return this.state.data !== dataSource.serializeUserData(this.props.userData);
    }

    handleChange(e) {
        this.setState({data: e.target.value});
    }

    handleImport() {
        const userData = dataSource.deserializeUserData(this.state.data);
        console.log('Import user data', userData);
        this.props.saveUserData(userData);
        history.replaceState('', document.title, location.pathname);
    }

    render() {
        const dataLink = `${location.href.split('#')[0]}#${btoa(dataSource.serializeUserData(this.props.userData))}`;
        return (
            <div className="message is-info backup-info">
                <div className="message-body">
                    <div className="content">
                        <p>These are your serialized settings. You can backup them if you ever want to use same setup in another browser. Just open this dialog in new browser and paste these settings in.</p>
                        <textarea className="textarea" value={this.state.data} onChange={this.handleChange} />
                        {this.dataChanged() && (
                            <button className="button is-primary is-fullwidth" onClick={this.handleImport}>Import</button>
                        )}
                        <br />
                        <p>You can also use following link to set these settings. Be careful though, it will override any previous settings set in the browser.</p>
                        <p>
                            <a className="backup-link" href={dataLink}>{dataLink}</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

BackupInfo.propTypes = {
    userData: PropTypes.object,

    saveUserData: PropTypes.func,
};

export default BackupInfo;
