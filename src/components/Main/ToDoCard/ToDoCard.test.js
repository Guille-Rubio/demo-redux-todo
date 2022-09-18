import React from "react";
import { shallow } from "enzyme";
import ToDoCard from "./ToDoCard";

describe("ToDoCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ToDoCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
