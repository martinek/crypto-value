import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

const ItemForm = ({fSyms, item, onChange, onRemove}) => {
    const handleChange = (key, value) => {
        onChange(Object.assign(item, {[key]: value}));
    };

    const valid = _.includes(fSyms, item.fSym);

    return (
        <div className={cx('field has-addons is-fullwidth', {'has-help': !valid})}>
            <p className="control">
                <button className="button is-danger" onClick={onRemove}>
                    <span className="icon">
                        <span className="fas fa-minus fa-sm" />
                    </span>
                </button>
            </p>
            {!valid && <p className="help has-text-danger">Selected symbol is not available</p>}
            <p className="control is-expanded">
                <input 
                    className={cx('input has-text-right', {'is-danger': !valid})}
                    value={item.amount || 0} 
                    type="number" 
                    placeholder="Amount" 
                    onChange={e => handleChange('amount', e.target.value)} 
                />
            </p>
            <p className="control">
                <span className={cx('select', {'is-danger': !valid})}>
                    <select value={item.fSym} onChange={e => handleChange('fSym', e.target.value)}>
                        {!valid && (
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
    fSyms: PropTypes.array,
    item: PropTypes.object,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
};

export default ItemForm;
