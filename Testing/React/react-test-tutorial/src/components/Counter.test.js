import React from "react";
import renderer from "react-test-renderer";
import Counter from "./Counter.js";

describe("Counter", () => {
  let component = null;

  it("render correctly", () => {
    component = renderer.create(<Counter />);
  });

  it("matches snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  //increase 가 잘되는지 확인
  it("increase correctly", () => {
    component.getInstance().onIncrese();
    expect(component.getInstance().state.value).tobe(2);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
