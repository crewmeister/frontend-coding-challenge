import React from 'react';
import App from './App';
import AbsenceTable from './components/AbsenceTable';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';


describe('Test Wrapper', () => {
    let initialState = { membersList: [], absenceList: [] }
    let mockStore = configureStore()
    let store: any;

    beforeEach(() => {
        initialState = { membersList: [], absenceList: [] }
        mockStore = configureStore()
    })

    describe('App', () => {
        it('should render correctly in "debug" mode', () => {
            store = mockStore(initialState)
            render(<Provider store={store}><App /></Provider>);
            // expect(component).toMatchSnapshot();
        });
    });

    describe('AbsenceTable', () => {
        it('should render correctly in "debug" mode', () => {
            store = mockStore(initialState)
            render(<Provider store={store}><AbsenceTable /></Provider>);
            // const linkElement = screen.getByText(/learn react/i);
            // expect(linkElement).toBeInTheDocument();

            // const component = shallow(<AbsenceTable />);
            // console.log(component.debug());
            // expect(component).toMatchSnapshot();
        });
    });
});

