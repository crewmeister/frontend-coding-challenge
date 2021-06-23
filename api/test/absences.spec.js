import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

import { getTotalAbsences, getStatusForTotal } from "../index.js";

const request = supertest(app);

describe("GET /absences", () => {
  it("returns a status of 200", (done) => {
    request
      .get("/api/absences")
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it("returns a list of absences", function (done) {
    request
      .get("/api/absences")
      .expect(200)
      .end(function (err, res) {
        expect(res.body.payload).to.have.lengthOf(10);
        done(err);
      });
  });

  it("returns a total of 42", function (done) {
    request
      .get("/api/absences")
      .expect(200)
      .end(function (err, res) {
        expect(res.body.total).to.eq(42);
        done(err);
      });
  });

  it("returns a total of 4", function (done) {
    request
      .get("/api/absences?status=requested")
      .expect(200)
      .end(function (err, res) {
        expect(res.body.total).to.eq(4);
        done(err);
      });
  });
});

describe("GET /ical/:id", () => {
  it("returns a status of 200", (done) => {
    request
      .get("/api/ical/608c98bf476b18964bfd886f")
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it("returns a status of 200", (done) => {
    request
      .get("/api/ical/324jhjhj23423hj")
      .expect(404)
      .end((err) => {
        done(err);
      });
  });
});

describe("Get total absences", () => {
  it("should return the total number of abcences", async () => {
    expect(await getTotalAbsences({})).to.be.eql(42);
  });

  it("should return the total number of abcences where status is requested", async () => {
    expect(await getTotalAbsences(getStatusForTotal("requested"))).to.be.eql(4);
  });

  it("should return the total number of abcences where status is rejected", async () => {
    expect(await getTotalAbsences(getStatusForTotal("rejected"))).to.be.eql(4);
  });

  it("should return the total number of abcences where status is confirmed", async () => {
    expect(await getTotalAbsences(getStatusForTotal("confirmed"))).to.be.eql(
      34
    );
  });
});

describe("Get status for total", () => {
  it("should return valid response for requested", () => {
    expect(getStatusForTotal("requested")).to.eql({
      confirmedAt: null,
      rejectedAt: null,
    });
  });

  it("should return valid response for confirmed", () => {
    expect(getStatusForTotal("confirmed")).to.eql({
      confirmedAt: { $ne: null },
    });
  });

  it("should return valid response for rejected", () => {
    expect(getStatusForTotal("rejected")).to.eql({
      rejectedAt: { $ne: null },
    });
  });

  it("should return valid response for default", () => {
    expect(getStatusForTotal()).to.eql({});
  });
});
