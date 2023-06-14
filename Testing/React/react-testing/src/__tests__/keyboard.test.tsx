import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";

describe("Testing", () => {
  it("clear testing", async () => {
    user.setup();
    render(<textarea defaultValue="Hello, World!" />);
    const textElement = screen.getByRole("textbox");

    await user.clear(textElement);
    expect(textElement).toHaveValue("");
  });

  it("selectOptions testing", async () => {
    user.setup();
    render(
      <select multiple>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );
    const selectElement = screen.getByRole("listbox");
    const optionA = screen.getByRole<HTMLOptionElement>("option", { name: "A" });
    const optionB = screen.getByRole<HTMLOptionElement>("option", { name: "B" });
    const optionC = screen.getByRole<HTMLOptionElement>("option", { name: "C" });

    await user.selectOptions(selectElement, ["1", "C"]);

    expect(optionA.selected).toBe(true);
    expect(optionB.selected).toBe(false);
    expect(optionC.selected).toBe(true);
  });

  it("deselectOptions", async () => {
    render(
      <select multiple>
        <option value="1">A</option>
        <option value="2" selected>
          B
        </option>
        <option value="3">C</option>
      </select>
    );

    await userEvent.deselectOptions(screen.getByRole("listbox"), "2");
    expect(screen.getByText<HTMLOptionElement>("B").selected).toBe(false);
  });

  it("upload file", async () => {
    render(
      <div>
        <label htmlFor="file-uploader">Upload file</label>
        <input id="file-uploader" type="file" />
      </div>
    );

    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const input = screen.getByLabelText<HTMLInputElement>(/Upload file/i); // type=file 은 Role 이 없다.
    await userEvent.upload(input, file);
    // input.files 가 없을 수 있으니, 먼저 If 로 에러를 처리해준다.
    if (!input.files) {
      throw new Error("input is null");
    }
    expect(input.files[0]).toBe(file);
    expect(input.files.item(0)).toBe(file);
    expect(input.files).toHaveLength(1);
  });
});
