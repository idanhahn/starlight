const { gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const booking = require('./booking');
const user = require('./user');
const vehicle = require('./vehicle');
const notification = require('./notification');
const resolvers = require('./resolvers');

const root = gql`
  type RootQuery {
    user(id: ID): User
    users: [User!]!
    vehicle(id: ID): Vehicle
    vehicles(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: VehicleFilter
    ): [Vehicle!]!
  }

  schema {
    query: RootQuery
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [vehicle, booking, user, notification, root],
  resolvers: resolvers,
});

module.exports = schema;

// gql`
//   type User {
//     _id: ID!
//     createdAt: String!
//     updatedAt: String!
//     deletedAt: String
//     firstName: String!
//     lastName: String
//     email: String!
//     avatar: String
//   }

//   type Booking {
//     _id: ID!
//     createdAt: String!
//     updatedAt: String!
//     deletedAt: String
//     from: String!
//     to: String!
//     cost: Float!
//     user: User
//     vehicle: Vehicle
//   }

//   type Vehicle {
//     _id: ID!
//     createdAt: String!
//     updatedAt: String!
//     deletedAt: String
//     description: String
//     img: String
//     size: String!
//     cost: Float!
//     vin: String
//     year: Int!
//     make: String!
//     name: String!
//     owner: User
//   }

//   type Notification {
//     _id: ID!
//     createdAt: String!
//     updatedAt: String!
//     deletedAt: String
//     message: String!
//     readAt: String
//     openAt: String
//     user: User
//   }

//   type RootQuery {
//     user(id: ID): User
//     users: [User!]!
//     vehicle(id: ID): Vehicle
//     vehicles: [Vehicle!]!
//   }

//   schema {
//     query: RootQuery
//   }
// `;
