const bookReviewService = require("../providers/bookReviewService");
const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");

router.post("/search", bookReviewService.search);
router.get("/getLatest", bookReviewService.getLatest);
router.get("/getAll", bookReviewService.getAll);
router.get("/:id", bookReviewService.getById);
router.post("/add", authenticate, bookReviewService.add);
router.delete("/:id", authenticate, bookReviewService.delete);
router.put("/:id", authenticate, bookReviewService.update);
router.get("/getAllByAuthorId/:reviewAuthorId", bookReviewService.getAllByAuthorId);
router.post("/:reviewId/comments", authenticate, bookReviewService.addCommentToReview);
router.get("/:reviewId/withComments", bookReviewService.getReviewWithComments);
router.put("/:reviewId/likeCount", authenticate, bookReviewService.updateLikeCount);

module.exports = router;