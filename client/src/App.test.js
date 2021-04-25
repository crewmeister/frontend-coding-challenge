import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import AbsenceTable from './components/AbsenceTable';

configure({ adapter: new Adapter() });

// describe('App', () => {
//     it('should render correctly in "debug" mode', () => {
//         const component = shallow(<App debug />);
//         console.log(component.debug());
//         expect(component).toMatchSnapshot();
//     });
// });

describe('AbsenceTable', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<AbsenceTable debug />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    });
});