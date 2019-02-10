import { FIXER_API_ENDPOINT, FIXER_API_KEY } from '../globals';
import request from 'request';
import { readFile, writeFile } from '../modules/util';
import { CACHE_TTL } from '../globals';

export async function convertCurrency(from, to, amount) {
    return amount * await calculateExchangeRate(from, to);
}

async function calculateExchangeRate(from, to) {
    let exr = await getExchangeRates();
    const FROM = exr.rates[from];
    const TO = exr.rates[to];
    return TO / FROM;
}

async function getExchangeRates() {
    let currentCache = readFile('../caches/currency.json');
    let currentCachedExchangeRates = JSON.parse(currentCache);
    if (cacheOutdated(currentCachedExchangeRates.timestamp)) {
        let rates = await getNewExchangeRates();
        if (rates) return rates;
    }

    return currentCachedExchangeRates;
}

function getNewExchangeRates() {
    return new Promise((resolve) => {
        request(`${FIXER_API_ENDPOINT}/latest?access_key=${FIXER_API_KEY}`, { json: true }, (err, res) => {
            if (err) { return console.log(err); }
            if (res.body.success) {
                res.body.timestamp = Date.now();
                writeFile('../caches/currency.json', JSON.stringify(res.body));
                resolve(res.body);
            } else {
                resolve(false);
            }
        }); 
    });
}

function cacheOutdated(timestamp) {
    let currentTimestamp = Date.now();
    if (currentTimestamp - CACHE_TTL < timestamp) return false;

    return true;
}