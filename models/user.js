const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: String,
  name: String,
  age: Number,
});

module.exports = mongoose.model("user", userSchema);
