const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");
const Schema = mongoose.Schema;
const distributorschema = new mongoose.Schema(
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
    UserId: {
      type: Array,
      default: undefined,
      ref: "users",
    },
    RegionId: {
      type: Schema.Types.ObjectId,
      ref: "regions",
    },
    AdminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);
module.exports = mongooose.model("distributor", distributorschema);
