const express = require("express");
const router = express.Router();
const { Article, Board } = require("../mongoose/model");

// 메인 화면에 나타나는 Board
router.get("/main", async (req, res) => {
  const board = await Board.find();
  if (!Array.isArray(board)) {
    res.send({
      error: true,
      msg: "게시판을 발견할 수 없음",
    });
  }

  let mainContent = [];
  Promise.all(
    board.map(async (b) => {
      const recentArticles = await Article.find({ board: b._id });
      if (!Array.isArray(recentArticles)) {
        return;
      }
      mainContent.push({
        ...b._doc,
        content: recentArticles,
      });
    })
  )
    .then(() => {
      res.send({
        content: mainContent,
        error: false,
        msg: "불러오기 성공했습니다.",
      });
    })
    .catch((err) => {
      console.error(err);
      res.send({
        content: null,
        error: true,
        msg: "서버 에러",
      });
    });
});

// 게시판 목록을 가져온다.
router.get("/board/list", async (req, res) => {
  const board = await Board.find();
  res.send(board);
});

// 게시판 별로 게시글을 가져온다.
router.get("/board/:slug", async (req, res) => {
  const { slug } = req.params;
  const board = await Board.findOne({ slug });
  if (!board._id) {
    return res.send({
      article: [],
      error: true,
      msg: "존재하지 않는 게시판",
    });
  }
  const article = await Article.find({ board: board._id });
  res.send({ article, error: false, msg: "성공" });
});

// 게시판 추가
router.post("/board/create", async (req, res) => {
  const { title, slug } = req.body;
  const newBoard = await Board({
    title,
    slug,
  }).save();

  console.log(newBoard);
  res.send(newBoard._id ? true : false);
});

module.exports = router;
