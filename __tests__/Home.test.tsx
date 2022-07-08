import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../src/screens/Home';
jest.useFakeTimers()

const goBack = jest.fn();
const navigate = jest.fn();
const setOptions = jest.fn();

it('App renders without crashing', () => {
    const rendered = renderer.create(<Home />).toJSON();
    expect(rendered).toBeTruthy();
});