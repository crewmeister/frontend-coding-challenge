export const populatedAbsences = [
  {
    admitterId: null,
    admitterNote: "",
    confirmedAt: "2020-12-12T18:03:55.000+01:00",
    createdAt: "2020-12-12T14:17:01.000+01:00",
    crewId: 352,
    endDate: "2021-01-13",
    id: 2351,
    memberNote: "I was not well",
    rejectedAt: null,
    startDate: "2021-01-13",
    type: "sickness",
    userId: 2664,
    memberName: "Mike"
  },
  {
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
    memberName: "Mike"
  },
];

export const absenceData = {
  message: "Success",
  payload: [
    {
      admitterId: null,
      admitterNote: "",
      confirmedAt: "2020-12-12T18:03:55.000+01:00",
      createdAt: "2020-12-12T14:17:01.000+01:00",
      crewId: 352,
      endDate: "2021-01-13",
      id: 2351,
      memberNote: "I was not well",
      rejectedAt: null,
      startDate: "2021-01-13",
      type: "sickness",
      userId: 2664
    },
    {
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
      userId: 2664
    },
  ]
}

export const failResp = {
  message: 'Failed to fetch absences',
};
