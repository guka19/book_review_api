const bookReviewService = require("../providers/bookReviewService");
const express = require("express");
const router = express.Router();

router.post("/search", bookReviewService.search);
router.get("/getLatest", bookReviewService.getLatest);
router.get("/getAll", bookReviewService.getAll);
router.get("/:id", bookReviewService.getById);
router.post("/add", bookReviewService.add);
router.delete("/:id", bookReviewService.delete);
router.put("/:id", bookReviewService.update);
router.get("/getAllByAuthorId/:reviewAuthorId", bookReviewService.getAllByAuthorId);

module.exports = router;