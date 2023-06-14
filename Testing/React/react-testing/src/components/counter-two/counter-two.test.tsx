import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import { CounterTwo } from "./counter-two";

describe("CounterTwo", () => {
  it("renders correctly", () => {
    render(<CounterTwo count={0} />);
    const textElement = screen.getByText("Counter Two");
    expect(textElement).toBeInTheDocument();
  });

  it("handlers are called", async () => {
    const incrementHandler = jest.fn(); // 함수를 생성해준다
    const decrementHandler = jest.fn();

    render(
      <CounterTwo
        count={0}
        handleIncrement={incrementHandler}
        handleDecrement={decrementHandler}
      />
    );

    const incrementButton = screen.getByRole("button", { name: "Increment" });
    const decrementButton = screen.getByRole("button", { name: "Decrement" });
    await userEvent.click(incrementButton); // 실행시킨다
    await userEvent.click(decrementButton);
    expect(incrementHandler).toHaveBeenCalledTimes(1); // 함수가 몇번 불리었는지 체크하기
    expect(decrementHandler).toHaveBeenCalledTimes(1);
  });
});
