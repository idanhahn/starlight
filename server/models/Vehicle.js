const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    deletedAt: Date,
    description: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    vin: {
      type: String,
      required: false,
    },
    year: {
      type: Number,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
