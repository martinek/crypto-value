import req from 'superagent';
import _ from 'lodash';

import ActionTypes from 'constants/ActionTypes';
import store from 'lib/store';

const BASE_URL = 'https://min-api.cryptocompare.com/data';

export default class DataSource {
    static fetchExchanges() {
        return req.get(`${BASE_URL}/all/exchanges`)
            .then(res => store.dispatch({
                type: ActionTypes.API.STORE_EXCHANGES,
                payload: res.body,
            }))
            .then(action => action.payload);
    }

    static fetchPrices(fSyms, tSyms, exchange) {
        return req.get(`${BASE_URL}/pricemulti?fsyms=${fSyms.join(',')}&tsyms=${tSyms.join(',')}&e=${exchange}`)
            .then(res => res.body);
    }

    static serializeUserData(userData) {
        return [
            _.get(userData, 'exchange'),
            _.get(userData, 'tSym'),
            _.get(userData, 'investment'),
            _.get(userData, 'items', []).map(i => [i.fSym, i.amount].join(':')).join('|'),
        ].join('|');
    }

    static deserializeUserData(data) {
        const result = {};
        try {
            const stream = data.trim().split('|').reverse();
            result.exchange = stream.pop();
            result.tSym = stream.pop();
            result.investment = stream.pop();
            result.items = stream.reverse().map(itemData => {
                const pts = itemData.split(':');
                return {
                    amount: pts[1],
                    fSym: pts[0],
                };
            });

            return result;
        } catch (error) {
            console.log('Could not deserialize data', error);
            throw new Error('Could not deserialize data. Data have invalid format.');
        }
    }
}
