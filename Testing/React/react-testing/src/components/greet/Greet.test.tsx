import { render, screen } from "@testing-library/react";
import Greet from "./Greet";

describe("Greet", () => {
  it("Greet render correctly", () => {
    render(<Greet />);
    const textElement = screen.getByText("Hello");
    expect(textElement).toBeInTheDocument();
  });

  it("Greet renders with a name", () => {
    render(<Greet name="Vish" />);
    const textElement = screen.getByText("Hello Vish");
    expect(textElement).toBeInTheDocument();
  });
});
