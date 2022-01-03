const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    firstName: String!
    lastName: String
    email: String!
    avatar: String
  }
`;

module.exports = typeDefs;
