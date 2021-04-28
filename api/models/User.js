const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  crewId: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  userId: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("User", UserSchema);
