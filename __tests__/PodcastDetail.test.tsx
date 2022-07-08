import React from 'react';
import renderer from 'react-test-renderer';
import Podcast from '../src/screens/Podcast';
jest.useFakeTimers()

const goBack = jest.fn();
const navigate = jest.fn();
const setOptions = jest.fn();

it('App renders without crashing', () => {
    const rendered = renderer.create(<Podcast />).toJSON();
    expect(rendered).toBeTruthy();
});