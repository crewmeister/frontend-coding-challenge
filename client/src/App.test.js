import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<App debug />);
        expect(component).toMatchSnapshot();
    });
});