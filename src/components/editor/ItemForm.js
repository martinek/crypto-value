import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

const ItemForm = ({dSym, fSyms, item, onChange, onRemove}) => {
    const handleChange = (key, value) => {
        onChange(Object.assign(item, {[key]: value}));
    };

    const same = dSym === item.fSym;
    const valid = same || _.includes(fSyms, item.fSym);

    return (
        <div className={cx('field has-addons is-fullwidth', {'has-help': !valid || same})}>
            <p className="control">
                <button className="button is-danger" onClick={onRemove}>
                    <span className="icon">
                        <span className="fas fa-minus fa-sm" />
                    </span>
                </button>
            </p>
            {!valid && <p className="help has-text-danger">Selected symbol is not available</p>}
            {same && <p className="help has-text-info">Selected symbol is same as display symbol</p>}
            <p className="control is-expanded">
                <input 
                    className={cx('input has-text-right', {'is-danger': !valid, 'is-info': same})}
                    value={item.amount || 0} 
                    type="number" 
                    placeholder="Amount" 
                    onChange={e => handleChange('amount', e.target.value)} 
                />
            </p>
            <p className="control">
                <span className={cx('select', {'is-danger': !valid, 'is-info': same})}>
                    <select value={item.fSym} onChange={e => handleChange('fSym', e.target.value)}>
                        {(!valid || same) && (
                            <option disabled key={item.fSym} value={item.fSym}>{item.fSym}</option>
                        )}
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
    dSym: PropTypes.string,
    fSyms: PropTypes.array,
    item: PropTypes.object,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
};

export default ItemForm;
