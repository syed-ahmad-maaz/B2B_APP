const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");
const Schema = mongoose.Schema;
const bookerschema = new mongoose.Schema(
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
    Phone_no: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    RegionId: {
      type: Schema.Types.ObjectId,
      ref: "regions",
    },
    AdminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongooose.model("booker", bookerschema);
