const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Importing models
const User = require("./models/User");
const Absence = require("./models/Absence");

//Initialiing app
const app = express();

//Allowing cors
app.use(cors());

//Database connection
mongoose.connect(
  "mongodb+srv://ram_kumar89:ramkumar12345_@cluster0.fdhoh.mongodb.net/test",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database");
  }
);

//Routes for the app
app.get("/api/absences", async (req, res) => {
  const { limit = 10, page = 1, keyword = "" } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    const absences = await Absence.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "userId",
          as: "user",
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          userId: 0,
        },
      },
      {
        $limit: parseInt(limit) + skip,
      },
      {
        $skip: skip,
      },
    ]);

    res.json({
      message: "Success",
      payload: absences,
      total: await getTotalAbsences(),
    });
  } catch (e) {
    res.json(e);
  }
});

async function getTotalAbsences() {
  try {
    const absences = await Absence.find();
    return absences.length;
  } catch (err) {
    return 0;
  }
}

app.listen(3001, () => {
  console.log("Listening on 3001");
});
