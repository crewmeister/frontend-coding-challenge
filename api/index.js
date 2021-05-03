import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ics from "ics";
import { writeFileSync } from "fs";
import moment from "moment";

//Importing models
import User from "./models/User.js";
import Absence from "./models/Absence.js";

//Ical file folder
const __dirname = "./downloads";

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

app.get("/api/ical/:id", async (req, res) => {
  try {
    const { id } = req.params;

    //Find absence by id
    const absence = await Absence.findOne({ _id: id }).populate("user");

    const startDate = moment(new Date(absence.startDate));
    const endDate = moment(new Date(absence.endDate));
    const days = endDate.diff(startDate, "days");
    const strDate = new Date(absence.startDate);

    //Creating Calendar event
    ics.createEvent(
      {
        title: `${absence.user.name} wants leave`,
        description: `${absence.user.name} wants leave due to ${absence.type}`,
        busyStatus: "BUSY",
        start: [
          strDate.getFullYear(),
          strDate.getMonth() + 1,
          strDate.getDate(),
          strDate.getHours(),
          strDate.getMinutes(),
        ],
        duration: { days: days ? days : 1 },
      },
      (error, value) => {
        if (error) {
          return res.status(404).json({ error });
        }

        writeFileSync(`${__dirname}/event.ics`, value);

        var file = __dirname + "/event.ics";
        res.download(file, "event.ics");
      }
    );
  } catch (error) {
    return res.status(404).json({ error });
  }
});

//This function is responsible to get the total absences in the table
export async function getTotalAbsences(match) {
  try {
    const absences = await Absence.find(match);
    return absences.length;
  } catch (err) {
    return 0;
  }
}

//This function is responsible to return the filters for particular status type
export function getStatusForTotal(status) {
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

export default app;
