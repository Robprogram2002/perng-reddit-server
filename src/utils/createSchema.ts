import { buildSchema } from 'type-graphql';
import AuthorizationCheck from '../middlewares/authorizationCheck';
import subsResolvers from '../resolvers/subResolvers';
import userResolvers from '../resolvers/userResolvers';
import HelloResolver from './testResolver';

const createSchema = async () =>
  buildSchema({
    //   regex : `${__dirname}../resolvers/**/resolver.ts`,
    resolvers: [HelloResolver, ...userResolvers, ...subsResolvers],
    authChecker: AuthorizationCheck,
  });

export default createSchema;
