import moment from "moment";
import {
  trimText,
  getStatus,
  capitalize,
  getNumberOfDays,
  handleMessage,
} from "../handlers";

describe("trimText handler", () => {
  it("should trim the text", () => {
    expect(trimText("This is my text which would be trimmed", 15)).toBe(
      "This is my text..."
    );
  });

  it("should handle the empty text", () => {
    expect(trimText("", 5)).toBe("");
  });

  it("should handle the small text from given length", () => {
    expect(trimText("My Text", 20)).toBe("My Text");
  });
});

describe("getStatus handler", () => {
  it("should display Requested", () => {
    expect(getStatus(false, false)).toBe("Requested");
  });

  it("should display Confirmed", () => {
    expect(getStatus(true, false)).toBe("Confirmed");
  });

  it("should display Rejected", () => {
    expect(getStatus(false, true)).toBe("Rejected");
  });
});

describe("capitalize handler", () => {
  it("should display Capital", () => {
    expect(capitalize("CAPITAL")).toBe("Capital");
  });

  it("should display Sunday", () => {
    expect(capitalize("sunday")).toBe("Sunday");
  });

  it("should display nothing", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("getNumberOfdays handler", () => {
  it("should display 17", () => {
    expect(getNumberOfDays(moment("2021-02-23"), moment("2021-03-11"))).toBe(
      17
    );
  });

  it("should handle empty case", () => {
    expect(getNumberOfDays()).toBe(0);
  });
});

describe("handleMessage handler", () => {
  it("should handle no input case", () => {
    expect(handleMessage()).toBe("");
  });

  it("should handle error case", () => {
    expect(handleMessage(false, true, false)).toBe(
      "Something went wrong with backend."
    );
  });

  it("should handle loading case", () => {
    expect(handleMessage(true, false, false)).toBe("Loading...");
  });

  it("should handle no data found case", () => {
    expect(handleMessage(false, false, true)).toBe("No Data Found.");
  });
});
