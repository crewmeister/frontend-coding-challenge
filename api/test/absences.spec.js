import express from "express";
import chai from "chai";
import request from "supertest";

const app = express();

describe("Get the list of absences", () => {
  it("should return the list of absences", () => {
    request(app)
      .get("api/absences")
      .send({})
      .expect(200)
      .then((res) => {
        expect(res.headers.location).to.be.eql("api/absences");
      });
  });
});

describe("Get total absences", () => {
  it("should return the total number of abcences", () => {});
});
