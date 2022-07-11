import React from "react";
import renderer from "react-test-renderer";
import SignIn from "../src/screens/SignIn";
import Enzyme, { shallow } from "enzyme";
import AppButton from "../src/components/Button/AppButton";
import Adapter from "enzyme-adapter-react-16";

jest.useFakeTimers();

Enzyme.configure({ adapter: new Adapter() });

it("App renders without crashing", () => {
  const rendered = renderer.create(<SignIn />).toJSON();
  expect(rendered).toBeTruthy();
});

describe("Test Button component", () => {
  it("Test click event", () => {
    const mockCallBack = jest.fn();
    const button = shallow(<AppButton onPress={mockCallBack} />);
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });
});
