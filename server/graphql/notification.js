const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Notification {
    _id: ID!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    message: String!
    readAt: String
    openAt: String
    user: User
  }
`;

module.exports = typeDefs;
