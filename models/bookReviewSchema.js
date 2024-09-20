const mongoose = require("mongoose");

const bookReviewSchema = new mongoose.Schema(
  {
    reviewAuthorId: {
      type: String,
      required: true,
    },

    reviewTitle: {
      type: String,
      required: true,
    },

    reviewDescription: {
      type: String,
      required: true,
    },

    reviewRating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },

    bookTitle: {
      type: String,
      required: true,
    },

    bookAuthor: {
      type: String,
      required: false,
    },

    bookGenre: {
      type: String,
      required: false,
    },

    publishedDate: {
      type: Date,
      required: false,
    },

    bookCoverUrl: {
      type: String,
      required: true,
    },
  },
  {
    collection: "reviews",
    timestamps: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeoutMS: 30000,
    },
    read: "nearest",
  }
);

const Model = mongoose.model("Review", bookReviewSchema);

module.exports = Model;
