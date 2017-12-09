import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import DataSource from 'lib/dataSource';

import CardHeader from './CardHeader';

const fPrice = (value, unit) => 
    value === null ? 
        '-' :
        Number(value).toFixed(2) + (unit ? ' ' + unit : '');

const Item = ({item, tSym}) => {
    return (
        <div className="level is-mobile item">
            <div className="level-left">
                <div>
                    <p>{item.sym}</p>
                    <p className="small">{fPrice(item.symPrice, tSym)}</p>
                </div>
            </div>
            <div className="level-right">
                <div className="has-text-right">
                    <p>{fPrice(item.value, tSym)}</p>
                    <p className="small">{item.amount} {item.sym}</p>
                </div>
            </div>
        </div>
    );
};
Item.propTypes = {
    item: PropTypes.object,
    tSym: PropTypes.string,
};

const Sum = ({value, tSym}) => {
    return (
        <div className="level is-mobile total">
            <div className="level-left">Total</div>
            <div className="level-right">{fPrice(value, tSym)}</div>
        </div>
    );
};
Sum.propTypes = { 
    value: PropTypes.number,
    tSym: PropTypes.string,
};

class Calculator extends Component {
    constructor(props) {
        super();
        this.state = {
            items: _.get(props, 'userData.items', []).map(item => ({
                sym: item.fSym,
                amount: Number(item.amount),
                symPrice: null,
                value: null,
            })),
        };
    }

    componentDidMount() {
        this.fetchPrices();
    }

    tSym() {
        return _.get(this, 'props.userData.tSym');
    }

    fetchPrices() {
        DataSource.fetchPrices(this.state.items.map(i => i.sym), [this.tSym()], _.get(this, 'props.userData.exchange'))
            .then(prices => this.updateValues(prices));
    }

    updateValues(prices) {
        this.setState({items: this.state.items.map(item => {
            item.symPrice = _.get(prices, `[${item.sym}][${this.tSym()}]`, 0);
            item.value = item.symPrice * item.amount;
            return item;
        })});
    }

    render() {
        const tSym = this.tSym();

        return (
            <div className="card main-card">
                <CardHeader>
                    <a 
                        className="card-header-icon has-text-primary" 
                        title="Reload price data"
                        onClick={() => this.fetchPrices()}>
                        <span className="icon">
                            <span className="fas fa-sync" />
                        </span>
                    </a>
                    <Link className="card-header-icon has-text-primary" to="/edit">
                        <span className="icon">
                            <span className="fas fa-cog" />
                        </span> 
                    </Link>
                </CardHeader>
                <div className="card-content">
                    {this.state.items.length > 0 ? 
                        this.state.items.map((item, i) => <Item key={i} item={item} tSym={tSym} />)
                        : (
                            <div className="message is-info has-text-centered">
                                <div className="message-body">Add some items in <Link to="/edit">configuration</Link></div>
                            </div>
                        )
                    }

                    <Sum value={this.state.items.reduce((acc, item) => acc += item.value, 0)} tSym={tSym} />
                </div>
            </div>
        );
    }
}

Calculator.propTypes = {
    exchanges: PropTypes.object,
    userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
    userData: state.userData,
});

export default connect(mapStateToProps)(Calculator);