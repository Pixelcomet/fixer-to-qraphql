import { makeExecutableSchema } from 'graphql-tools';
import { readFile } from '../modules/util';

import { resolvers } from './resolvers';

const typeDefs = readFile('../currency/schema.graphql');

export const schema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: [resolvers]
});