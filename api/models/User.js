import mongoose from "mongoose";

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

export default mongoose.models.User || mongoose.model("User", UserSchema);
