const { removeUndefined, removeEmpty } = require('../shared/helpers');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const Notification = require('../models/Notification');

const resolvers = {
  RootQuery: {
    users: async () => {
      return await User.find();
    },

    vehicle: async (parent, args) => {
      return await Vehicle.findById(args.id);
    },

    vehicles: async (parent, args) => {
      const { page, perPage, sortField, sortOrder } = args;
      const { cost_gte, cost_lte, make, model } = args.filter || {};

      var filter = removeEmpty({
        cost: {
          $gte: cost_gte,
          $lte: cost_lte,
        },
        make: make,
        model: model,
      });

      var sort = {};
      sort[sortField] =
        sortOrder === 'asc' ? 1 : sortOrder === 'desc' ? -1 : sortOrder;

      var options = removeEmpty({
        limit: perPage,
        skip: isNaN(perPage * page) ? undefined : perPage * page,
        sort: sort,
      });

      const results = await Vehicle.find({ ...filter }, {}, { ...options });
      return results;
    },
  },
  Vehicle: {
    async owner(parent) {
      return await User.findById({ _id: parent.owner_id });
    },
    async bookings(parent) {
      return await Booking.find({ vehicle_id: parent._id });
    },
  },
};

module.exports = resolvers;
