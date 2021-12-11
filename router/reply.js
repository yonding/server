const express = require("express");
const router = express.Router();
const { Reply } = require("../mongoose/model");

// 대댓글 달기
router.post("/reply/create", async (req, res) => {
  const { author, comment, content } = req.body;
  const newReply = await Reply({ author, comment, content }).save();
  res.send(newReply._id ? true : false);
});

// 대댓글 수정
router.patch("/reply/update", async (req, res) => {
  const { id, author, content } = req.body;
  const updatedReply = await Reply.findOneAndUpdate(
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
  res.send(updatedReply);
});

// 대댓글 삭제
router.delete("/reply/delete", async (req, res) => {
  const { id, author } = req.body;
  const deletedReply = await Reply.findOneAndDelete({
    _id: id,
    author,
  });
  res.send(deletedReply);
});

module.exports = router;
