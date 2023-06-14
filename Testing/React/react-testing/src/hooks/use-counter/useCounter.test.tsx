import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

// 커스텀훅을 부를때는 renderHook 을 활용하자
describe("useCounter", () => {
  it("should render the initial count", () => {
    const { result } = renderHook(useCounter);
    expect(result.current.count).toBe(0);
  });

  // props 를 설정해주기
  it("should accept and render the same initial count", () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialCount: 10,
      },
    });
    expect(result.current.count).toBe(10);
  });

  it("should increment the count", () => {
    const { result } = renderHook(useCounter);
    act(() => result.current.increment()); // 커스텀훅의 함수를 실행시키기 위해선 act() 가 필요하다
    expect(result.current.count).toBe(1);
  });

  it("should decrement the count", () => {
    const { result } = renderHook(useCounter);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(-1);
  });
});
