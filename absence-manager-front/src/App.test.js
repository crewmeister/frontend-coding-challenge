import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App.js";
import { useAbsences } from "./hooks/useAbsences";
import { absenceTypes } from "./utils/constants.js";

const { REQUESTED, REJECTED, CONFIRMED } = absenceTypes;

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

const mockedUseAbsences = useAbsences;

// Mock the module
jest.mock("./hooks/useAbsences.js");

describe("Absences", () => {
  beforeEach(() => {
    mockedUseAbsences.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders without crashing", () => {
    render(<App />);
  });

  it("Displays loading indicator", () => {
    mockedUseAbsences.mockImplementation(() => ({
      isLoading: true,
    }));

    const { container } = render(<App />);

    const spinner = container.getElementsByClassName("ant-spin-dot-spin");

    expect(spinner.length).toBe(1);
  });

  it("Displays error message", () => {
    mockedUseAbsences.mockImplementation(() => ({
      isError: true,
      error: "Unable to fetch the absences data",
    }));
    render(<App />);

    expect(
      screen.getByText("Unable to fetch the absences data")
    ).toBeInTheDocument();
  });

  it("Displays empty description", () => {
    mockedUseAbsences.mockImplementation(() => ({
      data: [],
      isLoading: false,
    }));

    const { container } = render(<App />);

    const spinner = container.getElementsByClassName("ant-spin-dot-spin");
    const emptyElement = container.getElementsByClassName(
      "ant-empty-description"
    );

    expect(spinner.length).toBe(0);
    expect(emptyElement.length).toBe(1);
  });

  it("Displays absence data list", () => {
    const mockedAbsenceData = {
      admitterId: null,
      admitterNote: "",
      confirmedAt: null,
      createdAt: "2021-06-12T15:21:16.000+02:00",
      crewId: 352,
      endDate: "2021-06-29",
      id: 6311,
      memberNote: "",
      rejectedAt: null,
      startDate: "2021-06-29",
      type: "vacation",
      userId: 5293,
      userName: "Daniel",
      key: 6311,
    };

    mockedUseAbsences.mockImplementation(() => ({
      data: [mockedAbsenceData],
      isLoading: false,
    }));

    const { container } = render(<App />);

    const spinner = container.getElementsByClassName("ant-spin-dot-spin");

    expect(spinner.length).toBe(0);

    screen.getAllByText(mockedAbsenceData.userName);
    screen.getAllByText(mockedAbsenceData.type);
    screen.getAllByText(mockedAbsenceData.startDate);
    screen.getAllByText(mockedAbsenceData.endDate);
    screen.getAllByText(mockedAbsenceData.memberNote);
    screen.getAllByText(mockedAbsenceData.admitterNote);
  });

  it("Displays absence list data with different status", () => {
    const mockedAbsenceData = {
      admitterId: null,
      admitterNote: "Sorry",
      confirmedAt: null,
      createdAt: "2021-01-03T17:36:52.000+01:00",
      crewId: 352,
      endDate: "2021-01-05",
      id: 2521,
      memberNote: "ganzer tag",
      rejectedAt: "2021-01-03T17:39:50.000+01:00",
      startDate: "2021-01-05",
      type: "vacation",
      userId: 2664,
      userName: "Mike",
    };

    let status = REQUESTED;
    if (mockedAbsenceData.rejectedAt) status = REJECTED;
    if (mockedAbsenceData.confirmedAt) status = CONFIRMED;

    mockedAbsenceData.status = status;

    mockedUseAbsences.mockImplementation(() => ({
      data: [mockedAbsenceData],
      isLoading: false,
    }));

    render(<App />);

    screen.getAllByText(mockedAbsenceData.userName);
    screen.getAllByText(mockedAbsenceData.type);
    screen.getAllByText(mockedAbsenceData.startDate);
    screen.getAllByText(mockedAbsenceData.endDate);
    screen.getAllByText(mockedAbsenceData.memberNote);
    screen.getAllByText(mockedAbsenceData.admitterNote);
    screen.getAllByText(mockedAbsenceData.admitterNote);
    screen.getAllByText(status);
  });
});
