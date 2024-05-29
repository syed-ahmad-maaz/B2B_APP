const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const distributorSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    AdminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    UserId: [
      {
        type: Schema.Types.ObjectId,
        default: undefined,
        ref: "users",
      },
    ],
    RegionId: {
      type: Schema.Types.ObjectId,
      ref: "regions",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("distributor", distributorSchema);
