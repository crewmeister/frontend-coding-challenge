import { render, screen, cleanup } from '@testing-library/react'
import AbsencesList from '../AbsencesList'

afterEach(() => {
    cleanup();
})

test('Should render Absences List component withour data', () => {
    render(<AbsencesList />);
    const absencesListElement = screen.getByTestId('list-of-absences');
    expect(absencesListElement).toBeInTheDocument();
    expect(absencesListElement).toHaveTextContent("Member");
})

test('Should render Absences List component with data', () => {
    const absences = [
        {
            "admitterId": null,
            "admitterNote": "",
            "confirmedAt": "2020-12-12T18:03:55.000+01:00",
            "createdAt": "2020-12-12T14:17:01.000+01:00",
            "crewId": 352,
            "endDate": "2021-01-13",
            "id": 2351,
            "memberNote": "",
            "rejectedAt": null,
            "startDate": "2021-01-13",
            "type": "sickness",
            "userId": 2664,
            "member_data":{
                "crewId": 352,
                "id": 709,
                "image": "https://loremflickr.com/300/400",
                "name": "Max",
                "userId": 2664
            }
        },{
            "admitterId": null,
            "admitterNote": "Sorry",
            "confirmedAt": null,
            "createdAt": "2021-01-03T17:36:52.000+01:00",
            "crewId": 352,
            "endDate": "2021-01-05",
            "id": 2521,
            "memberNote": "ganzer tag",
            "rejectedAt": "2021-01-03T17:39:50.000+01:00",
            "startDate": "2021-01-05",
            "type": "vacation",
            "userId": 2664,
            "member_data":{
                "crewId": 352,
                "id": 709,
                "image": "https://loremflickr.com/300/400",
                "name": "Max",
                "userId": 2664
            }
          }
    ]
    render(<AbsencesList list={absences} />);
    const absencesListElement = screen.getByTestId('list-of-absences');
    expect(absencesListElement).toBeInTheDocument();
    expect(absencesListElement).toHaveTextContent("Member");
})