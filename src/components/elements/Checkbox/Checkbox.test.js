import React from "react";
import { shallow } from "enzyme";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Checkbox />);
    expect(wrapper).toMatchSnapshot();
  });
});
