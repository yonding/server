const express = require("express");
const cors = require("cors");
const { article, user, board, comment, reply } = require("./router");
const app = express();
const port = process.env.PORT;
const SECRET = "!SQWE$EWEDSFA#@@#$TWA";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("jwt-secret", SECRET);

app.use(article);
app.use(user);
app.use(board);
app.use(comment);
app.use(reply);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
