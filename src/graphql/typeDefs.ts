import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String!
    post(id: ID!): Post!
    posts: [Post!]!
  }

  type Mutation {
    createPost(author: String!, content: String!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, content: String!): Post!
  }

  type Post {
    id: ID!
    author: String!
    content: String!
  }
`;
