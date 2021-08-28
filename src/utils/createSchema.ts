import { buildSchema } from 'type-graphql';
import userResolvers from '../resolvers/userResolvers';
import HelloResolver from './testResolver';

const createSchema = async () =>
  buildSchema({
    //   regex : `${__dirname}../resolvers/**/resolver.ts`,
    resolvers: [HelloResolver, ...userResolvers],
  });

export default createSchema;
