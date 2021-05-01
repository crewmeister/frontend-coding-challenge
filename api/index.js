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
  try {
    const {
      limit = 10,
      page = 1,
      status = "",
      startDate = null,
      endDate = null,
    } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    //Status related filters
    let match = getStatusForTotal(status);

    //Start date filter
    if (startDate) {
      match = {
        ...match,
        startDate: { $gte: new Date(parseInt(startDate)) },
      };
    }

    //End date filter
    if (endDate) {
      match = {
        ...match,
        endDate: { $lte: new Date(parseInt(endDate)) },
      };
    }

    //Querying in absences table
    const absences = await Absence.find(match)
      .populate("user")
      .limit(parseInt(limit))
      .skip(skip);

    //Returning payload
    res.json({
      message: "Success",
      payload: absences,
      total: await getTotalAbsences(match),
    });
  } catch (e) {
    res.json(e);
  }
});

//This function is responsible to get the total absences in the table
async function getTotalAbsences(match) {
  try {
    const absences = await Absence.find(match);
    return absences.length;
  } catch (err) {
    return 0;
  }
}

//This function is responsible to return the filters for particular status type
function getStatusForTotal(status) {
  switch (status) {
    case "requested":
      return {
        confirmedAt: null,
        rejectedAt: null,
      };

    case "confirmed":
      return {
        confirmedAt: { $ne: null },
      };

    case "rejected":
      return {
        rejectedAt: { $ne: null },
      };
    default:
      return {};
  }
}

app.listen(3001, () => {
  console.log("Listening on 3001");
});
