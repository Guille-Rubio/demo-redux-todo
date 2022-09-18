import React from "react";
import { shallow } from "enzyme";
import ToDoList from "./ToDoList";

describe("ToDoList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ToDoList />);
    expect(wrapper).toMatchSnapshot();
  });
});
