const express = require("express");
const router = express.Router();
const { Comment } = require("../mongoose/model");

// 댓글 달기
router.post("/comment/create", async (req, res) => {
  const { author, article, content } = req.body;
  const newComment = await Comment({ author, article, content }).save();
  res.send(newComment._id ? true : false);
});

// 댓글 수정
router.patch("/comment/update", async (req, res) => {
  const { id, author, content } = req.body;
  const updatedComment = await Comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      content,
    },
    {
      new: true,
    }
  );
  res.send(updatedComment);
});

// 댓글 삭제 - Soft Delete : (삭제된 댓글입니다.)
router.delete("/comment/delete", async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      content: "삭제된 댓글입니다.",
    },
    {
      new: true,
    }
  );
  res.send(deletedComment);
});

module.exports = router;
