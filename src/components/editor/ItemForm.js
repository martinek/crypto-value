import React from 'react';
import PropTypes from 'prop-types';

const ItemForm = ({item, onChange, onRemove}) => {
    const handleChange = (key, value) => {
        onChange(Object.assign(item, {[key]: value}));
    };

    return (
        <div className="field has-addons is-fullwidth">
            <p className="control">
                <button className="button is-danger" onClick={onRemove}>
                    <span className="icon">
                        <span className="fas fa-minus fa-sm" />
                    </span>
                </button>
            </p>
            <p className="control is-expanded">
                <input 
                    className="input has-text-right"
                    value={item.amount || 0} 
                    type="number" 
                    placeholder="Amount" 
                    onChange={e => handleChange('amount', e.target.value)} 
                />
            </p>
            <p className="control">
                <input type="text" className="input" value={item.fSym} onChange={e => handleChange('fSym', e.target.value)} />
            </p>
        </div>
    );
};

ItemForm.propTypes = {
    item: PropTypes.object,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
};

export default ItemForm;
