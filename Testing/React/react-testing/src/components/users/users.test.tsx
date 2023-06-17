import { render, screen } from "@testing-library/react";
import { Users } from "./users";
import { rest } from "msw";
import { server } from "../../mocks/server";

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

  it("renders error", async () => {
    server.use(
      rest.get("http://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<Users />);
    const errorMessage = await screen.findByText("Error fetching users");
    expect(errorMessage).toBeInTheDocument();
  });
});
