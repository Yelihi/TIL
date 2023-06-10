import { render, screen } from "@testing-library/react";
import Skills from "./skills";

describe("Skills", () => {
  const skills = ["HTML", "CSS", "Javascript"];

  it("render correctly", () => {
    render(<Skills skills={skills} />);
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  it("renders a list of skills", () => {
    render(<Skills skills={skills} />);
    const listItemElement = screen.getAllByRole("listitem");
    expect(listItemElement).toHaveLength(3); // getAllBy 는 배열을 반환한다. 따라서 toHaveLength 를 통해 길이를 확인해준다.
  });

  it("renders Login button", () => {
    render(<Skills skills={skills} />);
    const loginButtonElement = screen.getByRole("button", {
      name: "Login",
    });
    expect(loginButtonElement).toBeInTheDocument();
  });

  it("Start learning button is not rendered", () => {
    render(<Skills skills={skills} />);
    const startLearnningButton = screen.queryByRole("button", {
      name: "Start learning",
    });
    expect(startLearnningButton).not.toBeInTheDocument();
  });
});
