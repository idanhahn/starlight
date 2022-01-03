const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    deletedAt: Date,
    message: {
      type: String,
      required: true,
    },
    reatAt: {
      type: Date,
      required: false,
    },
    openAt: {
      type: Date,
      required: false,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
