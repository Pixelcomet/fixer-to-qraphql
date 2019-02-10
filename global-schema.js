import { mergeSchemas } from 'graphql-tools';

import { schema as currencySchema } from './currency/schema';

export const schema = mergeSchemas({
    schemas: [
        currencySchema,
    ],
});
