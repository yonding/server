const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Article, Comment } = require("../mongoose/model");

// 게시글 읽기
router.get("/article/:id", async (req, res) => {
  const { id } = req.params;
  const article = await Article.findbyId(id);
  const comment = await Comment.find({ article: id });
  res.send({ article, comment });
});

// 게시글 게시
router.post("/article/create", async (req, res) => {
  const { title, content, board } = req.body;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.send({
      error: true,
      msg: "토큰이 존재하지 않습니다.",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = req.app.get("jwt-secret");
  jwt.verify(token, secret, async (err, data) => {
    if (err) {
      res.send(err);
    }
    const newArticle = await Article({
      author: data.id,
      title,
      content,
      board,
    }).save();
    res.send(newArticle);
  });
});

// 게시글 수정
router.patch("/article/update", async (req, res) => {
  const { id, author, content } = req.body;
  const updatedArticle = await Article.findOneAndUpdate(
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
  res.send(updatedArticle);
});

// 댓글 삭제 - Soft Delete : (삭제된 게시글입니다.)
router.delete("/article/delete", async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      content: "삭제된 게시글입니다.",
    },
    {
      new: true,
    }
  );
  res.send(deletedArticle);
});

module.exports = router;
