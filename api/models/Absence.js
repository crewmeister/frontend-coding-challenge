import mongoose from "mongoose";

const AbsenceSchema = mongoose.Schema({
  admitterId: {
    type: Number,
  },
  admitterNote: {
    type: String,
  },
  confirmedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  crewId: {
    required: true,
    type: Number,
  },
  endDate: {
    type: Date,
  },
  id: {
    required: true,
    type: Number,
  },
  memberNote: {
    type: String,
  },
  rejectedAt: {
    type: Date,
  },
  startDate: {
    type: Date,
  },
  type: {
    type: String,
  },
  userId: {
    required: true,
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Absence ||
  mongoose.model("Absence", AbsenceSchema);
