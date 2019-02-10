import { convertCurrency } from './functions';
import { formatMoney } from '../modules/util'

export const resolvers = {
    Query: {
        convert: async (_, { query: { from, to, amount, accuracy, decimalSeperator, seperator } }) => {
            amount = await convertCurrency(from, to, amount);
            return formatMoney(amount, accuracy, decimalSeperator, seperator).toString();
        },
    }
};