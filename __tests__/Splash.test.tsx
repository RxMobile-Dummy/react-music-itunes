import React from 'react';
import renderer from 'react-test-renderer';
import Splash from '../src/screens/Splash';
jest.useFakeTimers()

const goBack = jest.fn();
const navigate = jest.fn();
const setOptions = jest.fn();

it('App renders without crashing', () => {
    const rendered = renderer.create(<Splash />).toJSON();
    expect(rendered).toBeTruthy();
});

it('App test against snapshot', () => {
    const tree = renderer.create(<Splash navigation={{ goBack, navigate, setOptions }} />)
    expect(tree).toMatchSnapshot();
});