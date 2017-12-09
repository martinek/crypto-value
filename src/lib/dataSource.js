import req from 'superagent';

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
}
