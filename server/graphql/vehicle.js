const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input VehicleFilter {
    sizes: [String]
    cost_lte: Float
    cost_gte: Float
    make: String
    model: String
  }

  type Vehicle {
    _id: ID!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    description: String
    img: String
    size: String!
    cost: Float!
    vin: String
    year: Int!
    make: String!
    model: String!
    owner: User
    bookings: [Booking]
  }
`;

module.exports = typeDefs;
