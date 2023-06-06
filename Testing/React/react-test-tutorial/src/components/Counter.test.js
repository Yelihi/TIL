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
    const tree = component.toJSON();
    renderer.act(() => {
      tree.onIncrese();
    });
    tree = component.toJSON();

    expect(component).tobe(2);
    expect(tree).toMatchSnapshot();
  });
});
