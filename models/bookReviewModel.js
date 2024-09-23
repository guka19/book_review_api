const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    collection: "comments",
    timestamps: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeoutMS: 30000,
    },
    read: "nearest",
  }
);

// Book Review Schema
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
    reviewLikeCount: {
      type: Number,
      default: 0,
      required: true,
      min: [0, "Likes can't be lesser than 0"],
    },
    reviewComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
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

const Comment = mongoose.model("Comment", commentSchema);
const Review = mongoose.model("Review", bookReviewSchema);

module.exports = { Review, Comment };
