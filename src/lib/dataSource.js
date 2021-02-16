import req from 'superagent';
import get from 'lodash/get';

const BASE_URL = 'https://min-api.cryptocompare.com/data';

export default class DataSource {
    static fetchPrices(fSyms, tSyms) {
        return req.get(`${BASE_URL}/pricemulti?fsyms=${fSyms.join(',')}&tsyms=${tSyms.join(',')}`)
            .then(res => res.body);
    }

    static serializeUserData(userData) {
        return [
            'v2',
            get(userData, 'tSym'),
            get(userData, 'investment'),
            get(userData, 'items', []).map(i => [i.fSym, i.amount].join(':')).join('|'),
        ].join('|');
    }

    static deserializeUserData(data) {
        if (data[0] === 'v' && data[1] === '2' && data[2] === '|') {
            return this.deserializeV2(data);
        } else {
            return this.deserializeV1(data);
        }
    }

    static deserializeV2(data) {
        const result = {};
        try {
            const stream = data.trim().split('|').reverse();
            const _version = stream.pop();
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

    static deserializeV1(data) {
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
