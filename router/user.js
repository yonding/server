const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../mongoose/model");

// 사용자 로그인
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const isThisUserThere = await User.findOne({ email: email });

  if (!isThisUserThere._id) {
    return res.send({
      error: true,
      msg: "존재하지 않는 아이디입니다.",
    });
  }

  const isPasswordCorrect = await isThisUserThere.authenticate(password);
  if (!isPasswordCorrect) {
    return res.send({
      error: true,
      msg: "비밀번호가 일치하지 않습니다.",
    });
  }

  const secret = req.app.get("jwt-secret");
  const token = jwt.sign(
    {
      id: isThisUserThere._id,
      email: isThisUserThere.email,
      nickname: isThisUserThere.nickname,
    },
    secret,
    {
      expiresIn: "7d",
      issuer: "KHU_CSE_Community",
      subject: "auth",
    }
  );
  res.send({
    email: isThisUserThere.email,
    token: token,
    error: false,
    nickname: isThisUserThere.nickname,
    score: isThisUserThere.score,
    msg: "로그인 성공",
  });
});

// 사용자 추가
router.post("/user/signup", async (req, res) => {
  const { nickname, email, major, grade, password } = req.body;
  const newUser = await User({
    email,
    nickname,
    password,
    major,
    grade,
  }).save();

  console.log(newUser);
  res.send(newUser._id ? true : false); // 생성 성공 여부 확인
});

// 사용자 토큰 확인
router.get("/user/token", (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.send(false);
  }
  const token = authorization.split(" ")[1];
  const secret = req.app.get("jwt-secret");
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send({
      email: data.email,
      nickname: data.nickname,
      token: token,
    });
  });
});

// 사용자 랭킹 불러오기
router.get("/user/lanking", async (req, res) => {
  const user = await User.find().limit(10).sort({ score: -1 });
  res.send(user);
});
module.exports = router;
