const mongoose = require("mongoose");
const schema = require("./schema");

const db = mongoose.connection;
const model = (() => {
  db.on("error", console.error);
  db.on("open", () => {
    console.log("Connecting...");
  });

  mongoose.connect(
    `mongodb+srv://uwrgoy7584:rlarkdud7584!@cluster0.yo1nn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );

  const model = {};
  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key]);
  }
  return model;
})();

module.exports = model;
