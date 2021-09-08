import { buildSchema } from 'type-graphql';
import AuthorizationCheck from '../middlewares/authorizationCheck';
import subsResolvers from '../resolvers/subResolvers';
import userResolvers from '../resolvers/userResolvers';
import topicResolvers from '../resolvers/topicResolvers';
import tagResolvers from '../resolvers/tagResolvers';
import HelloResolver from './testResolver';
import postResolvers from '../resolvers/postResolvers';

const createSchema = async () =>
  buildSchema({
    resolvers: [
      HelloResolver,
      ...userResolvers,
      ...subsResolvers,
      ...topicResolvers,
      ...tagResolvers,
      ...postResolvers,
    ],
    authChecker: AuthorizationCheck,
  });

export default createSchema;
