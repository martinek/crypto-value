import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

const ExchangeInfo = ({exchangeName, trades, tSyms, tSym}) => (
    <div className="message is-info exchange-info">
        <div className="message-body">
            <div className="content">
                <p>If you can&apos;t see your currency, try selecting different Display symbol. Exchange might not trade in this combination.</p>
                <strong>Available trades on {exchangeName}:</strong>
                <table className="table is-narrow">
                    <thead>
                        <tr>
                            <th />
                            {tSyms.map(s => <th key={s} className={cx({selected: s === tSym})}>{s}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {_.keys(trades).sort().map(sym => (
                            <tr key={sym}>
                                <th>{sym}</th>
                                {tSyms.map(s => (
                                    <td key={s} className={cx({selected: s === tSym})}>{_.includes(trades[sym], s) && (
                                        <span className="icon"> 
                                            <span className="fas fa-check" />
                                        </span>)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

ExchangeInfo.propTypes = {
    exchangeName: PropTypes.string,
    trades: PropTypes.object,
    tSyms: PropTypes.array,
    tSym: PropTypes.string,
};

export default ExchangeInfo;
