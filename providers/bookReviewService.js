const bookReviewModel = require("../models/bookReviewModel");

module.exports = {
  getAll: (req, res) => {
    bookReviewModel
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
      const items = await bookReviewModel.findById(req.params.id);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  add: async (req, res) => {
    try {
      const savedItem = await new bookReviewModel(req.body).save();
      res.status(200).json(savedItem);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  delete: async (req, res) => {
    try {
      const item = await bookReviewModel.deleteOne({ _id: req.params.id });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    try {
      const item = await bookReviewModel.findByIdAndUpdate(
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
    bookReviewModel
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
      const data = bookReviewModel.find({
        reviewAuthorId: req.params.reviewAuthorId,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
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

      const data = await bookReviewModel.find(query);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
