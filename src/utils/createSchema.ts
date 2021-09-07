import { buildSchema } from 'type-graphql';
import AuthorizationCheck from '../middlewares/authorizationCheck';
import subsResolvers from '../resolvers/subResolvers';
import userResolvers from '../resolvers/userResolvers';
import topicResolvers from '../resolvers/topicResolvers';
import HelloResolver from './testResolver';

const createSchema = async () =>
  buildSchema({
    resolvers: [
      HelloResolver,
      ...userResolvers,
      ...subsResolvers,
      ...topicResolvers,
    ],
    authChecker: AuthorizationCheck,
  });

export default createSchema;
