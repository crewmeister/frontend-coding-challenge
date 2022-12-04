import { calculateNoOfDays } from "../../helpers/absencesHelper";

describe("test absencesHelper functions", () => {
  describe("test calculateNoOfDays()", () => {
    it("when startDate is the same as the endDate, no of days should be 1", () => {
      const expectedResult = 1;
      expect(calculateNoOfDays("2022-10-10", "2022-10-10")).toEqual(
        expectedResult
      );
    });

    it("when startDate is 2 days before the endDate, no of days should be 2", () => {
      const expectedResult = 3;
      expect(calculateNoOfDays("2022-10-08", "2022-10-10")).toEqual(
        expectedResult
      );
    });

    it("when startDate is after the endDate, should return error message", () => {
      const expectedResult = "End date should be same as or after Start date";
      expect(calculateNoOfDays("2022-10-12", "2022-10-10")).toEqual(
        expectedResult
      );
    });

    it("when startDate or endDate is invalid, should return error message", () => {
      const expectedResult = "Invalid Date format";
      expect(calculateNoOfDays("invalid", "2022-10-10")).toEqual(
        expectedResult
      );
    });
  });
});
