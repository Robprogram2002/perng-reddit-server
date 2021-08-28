import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import helmet from 'helmet';
import cors from 'cors';
import createSchema from './utils/createSchema';

dotenv.config();

const main = async () => {
  try {
    await createConnection();

    const schema = await createSchema();

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({
        req,
        res,
      }),
    });
    await apolloServer.start();

    const app = express();

    app.use(cookieParser());
    // app.use(helmet());
    app.use(
      cors({
        credentials: true,
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        optionsSuccessStatus: 200,
      })
    );

    apolloServer.applyMiddleware({ app, path: '/api/graphql' });

    app.listen(process.env.PORT || 5000, () =>
      console.log('Server is running on http://localhost:5000')
    );
  } catch (error) {
    console.error(error);
  }
};

main();
