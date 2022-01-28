import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import express from 'express';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
const mongoose = require('mongoose');

const app = express();
const httpServer = http.createServer(app);
const corsOptions = {
  credentials: true,
  // origin: ['https://studio.apollographql.com', 'http://localhost:3000/'],
  origin: '*',
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

const startServer = async () => {
  await server.start();

  server.applyMiddleware({ app, cors: corsOptions });

  await mongoose
    .connect(`mongodb://127.0.0.1:27017/mongo-graphql-react`, {
      useNewUrlParser: true,
    })
    .then(() => console.log('Connected To DB'));

  app.listen({ port: 4000 }, () =>
    console.log(
      `graphql server ready at http://localhost:4000${server.graphqlPath}`
    )
  );
};

startServer();
