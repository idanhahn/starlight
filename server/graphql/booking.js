const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Booking {
    _id: ID!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    from: String!
    to: String!
    cost: Float!
    user: User
    vehicle: Vehicle
  }
`;

module.exports = typeDefs;
