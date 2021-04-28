const mongoose = require("mongoose");

const AbsenceSchema = mongoose.Schema({
  admitterId: {
    required: true,
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
});

AbsenceSchema.virtual("member", {
  ref: "User", // The model to use
  localField: "userId", // Find people where `localField`
  foreignField: "userId", // is equal to `foreignField`
});

module.exports = mongoose.model("Absence", AbsenceSchema);
