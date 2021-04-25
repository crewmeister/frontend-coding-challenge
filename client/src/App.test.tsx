import React from 'react';
import App from './App';
import AbsenceTable from './components/AbsenceTable';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';

const mockAbsenceList = [{
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
    "userId": 644
},
{
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
    "userId": 649
},
];

const mockMemberList = [
    {
        "crewId": 352,
        "id": 709,
        "image": "https://loremflickr.com/300/400",
        "name": "Max",
        "userId": 644
    },
    {
        "crewId": 352,
        "id": 713,
        "image": "https://loremflickr.com/300/400",
        "name": "Ines",
        "userId": 649
    },
];

describe('Test Wrapper', () => {
    const initialState = { membersList: mockMemberList, absenceList: mockAbsenceList }
    const initialStateEmpty = { membersList: [], absenceList: [] }
    let mockStore = configureStore()
    let store: any;

    beforeEach(() => {
        mockStore = configureStore()
    })

    describe('App', () => {
        it('should render correctly in "debug" mode', () => {
            store = mockStore(initialState)
            render(<Provider store={store}><App /></Provider>);
            expect(screen.getByText('Please proceed to Absence List screen to view the staff that is absent and their details'))
                .toHaveTextContent('Please proceed to Absence List screen to view the staff that is absent and their details')
        });
    });

    describe('AbsenceTable', () => {
        it('should render correctly in "debug" mode', () => {
            store = mockStore(initialState);
            render(<Provider store={store}><AbsenceTable /></Provider>);

            // console.log(screen);
            // console.log(screen.debug());
        });
    });

    describe('AbsenceTable', () => {
        it('should render correctly in "debug" mode', () => {
            store = mockStore(initialStateEmpty);
            render(<Provider store={store}><AbsenceTable /></Provider>);
        });
    });
});

