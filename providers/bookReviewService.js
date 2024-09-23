const {Review, Comment} = require("../models/bookReviewModel");

module.exports = {
  getAll: (req, res) => {
    Review
      .find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

  getById: async (req, res) => {
    try {
      const items = await Review.findById(req.params.id);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  add: async (req, res) => {
    try {
      const savedItem = await new Review(req.body).save();
      res.status(200).json(savedItem);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  delete: async (req, res) => {
    try {
      const item = await Review.deleteOne({ _id: req.params.id });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    try {
      const item = await Review.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
          new: true,
        }
      );

      res.json(item);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getLatest: (req, res) => {
    Review
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  },

  getAllByAuthorId: async (req, res) => {
    try {
      const data = await Review.find({
        reviewAuthorId: req.params.reviewAuthorId,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  search: async (req, res) => {
    try {
      const { reviewTitle, bookTitle, bookAuthor, bookGenre } = req.body;

      let query = {};

      if (reviewTitle) {
        query.reviewTitle = { $regex: new RegExp(reviewTitle, "i") }; 
      }

      if (bookTitle) {
        query.bookTitle = { $regex: new RegExp(bookTitle, "i") };
      }

      if (bookAuthor) {
        query.bookAuthor = { $regex: new RegExp(bookAuthor, "i") };
      }

      if (bookGenre) {
        query.bookGenre = { $regex: new RegExp(bookGenre, "i") };
      }

      const data = await Review.find(query);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addCommentToReview: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const commentData = req.body;
  
      const newComment = new Comment(commentData);
      const savedComment = await newComment.save();
  
      const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { $push: { reviewComments: savedComment._id } },
        { new: true }
      ).populate("reviewComments");
  
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  getReviewWithComments: async (req, res) => {
    try {
      const review = await Review.findById(req.params.reviewId)
        .populate({
          path: "reviewComments", // Field in the Review schema
          model: "Comment", // Reference to the Comment model
        });
  
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  

  updateLikeCount: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const { increment } = req.body;

      const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { $inc: { reviewLikeCount: increment ? 1 : -1 } },
        { new: true }
      );

      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
