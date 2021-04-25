import React from 'react';
import App from './App';
import AbsenceTable from './components/AbsenceTable';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';

// describe('App', () => {
//     it('should render correctly in "debug" mode', () => {
//         const component = shallow(<App debug />);
//         expect(component).toMatchSnapshot();
//     });
// });

describe('AbsenceTable', () => {

    const initialState = { output: 10 }
    const mockStore = configureStore()
    let store: any;
    let wrapper;

    it('should render correctly in "debug" mode', () => {
        store = mockStore(initialState)
        render(<Provider store={store}><AbsenceTable /></Provider>);
        // const linkElement = screen.getByText(/learn react/i);
        console.log(screen);
        // expect(linkElement).toBeInTheDocument();

        // const component = shallow(<AbsenceTable />);
        // console.log(component.debug());
        // expect(component).toMatchSnapshot();
    });
});