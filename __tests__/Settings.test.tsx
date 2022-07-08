import React from 'react';
import renderer from 'react-test-renderer';
import Settings from '../src/screens/settings';
jest.useFakeTimers()

const goBack = jest.fn();
const navigate = jest.fn();
const setOptions = jest.fn();

it('App renders without crashing', () => {
    const rendered = renderer.create(<Settings />).toJSON();
    expect(rendered).toBeTruthy();
});