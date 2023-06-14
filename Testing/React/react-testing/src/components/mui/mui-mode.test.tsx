import { render, screen } from "../../test-utils"; // 원래 testing-library 에서 가져오는걸 test-util 에서 가져오는걸로 변경
import { AppProviders } from "../../providers/app-providers";
import { MuiMode } from "./mui-mode";

// provider 를 고려해야한다.
describe("MuiMode", () => {
  it("renders text correctly", () => {
    render(<MuiMode />);
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toHaveTextContent("dark mode");
  });
});
