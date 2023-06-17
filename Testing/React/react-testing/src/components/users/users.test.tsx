import { render, screen } from "@testing-library/react";
import { Users } from "./users";

describe("Users", () => {
  it("render correctly", () => {
    render(<Users />);
    const textElement = screen.getByText("Users");
    expect(textElement).toBeInTheDocument();
  });

  it("renders a list of users", async () => {
    render(<Users />);
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(3);
  });
});
