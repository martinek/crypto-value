import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LayoutContainer extends Component {
    render(){
        return (
            <div>EmptyApp</div>
        );
    }
}

LayoutContainer.propTypes = {
};

const mapStateToProps = (state, _ownProps) => ({
});

const mapDispatchToProps = (dispatch, _ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
