const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    profilePicture: {
      type: String,
      required: false,
    },

    dob: {
      type: Date,
      required: true
    },

    bio: {
      type: String,
      required: false,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
  },
  {
    collection: "users",
    timestamps: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeoutMS: 30000,
    },
    read: "nearest",
  }
);

const Model = mongoose.model("User", userSchema);

module.exports = Model;
