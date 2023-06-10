import { render, screen } from "@testing-library/react";
import { Application } from "./application";

describe("Application", () => {
  it("renders correctly", () => {
    render(<Application />); // 먼저 렌더를 해준다
    const pageHeading = screen.getByRole("heading", {
      name: "Job application form", // h1 태그의 입력값. 혹은 level: 1 이런식으로 h1 을 표현할 수 있다.
    });
    expect(pageHeading).toBeInTheDocument();

    const sectionHeading = screen.getByRole("heading", {
      name: "Section 1",
    });
    expect(sectionHeading).toBeInTheDocument();

    // 입력된 문단이나 글자를 찾는다
    const sectionParagraph = screen.getByText("All fields are mandatory");
    expect(sectionParagraph).toBeInTheDocument();

    // title 을 체크한다
    const closeElement = screen.getByTitle("close");
    expect(closeElement).toBeInTheDocument();

    // 이미지 등의 alt 문구를 체크해준다
    const imageElement = screen.getByAltText("a person with a laptop");
    expect(imageElement).toBeInTheDocument();

    // data-testid 를 체크한다
    const customElement = screen.getByTestId("custom-element");
    expect(customElement).toBeInTheDocument();

    const nameElement = screen.getByRole("textbox", {
      name: "Name", // label 의 이름에 따라 다르게 구별
    }); // input box 가 있는지 확인하기
    expect(nameElement).toBeInTheDocument();

    const nameElement2 = screen.getByLabelText("Name", {
      // 만일 다른 label 에 Name 이 있어도, label 이 가르키는 element 를 지정해주면 된다
      selector: "input",
    }); // 이게 더 유용할 거 같다.
    expect(nameElement2).toBeInTheDocument();

    // 모든 placeholder 를 찾은 다음 Fullname 에 해당하는 요소가 있는지 확인한다.
    const nameElement3 = screen.getByPlaceholderText("Fullname");
    expect(nameElement3).toBeInTheDocument();

    // input 에 입력된 value 값을 체크해준다.
    const nameElement4 = screen.getByDisplayValue("Vishwas");
    expect(nameElement4).toBeInTheDocument();

    const doriElement = screen.getByRole("textbox", {
      name: "Dori",
    });
    expect(doriElement).toBeInTheDocument();

    const jobLocationElement = screen.getByRole("combobox"); // selectBox 있는지 확인하기
    expect(jobLocationElement).toBeInTheDocument();

    const termsElement = screen.getByRole("checkbox"); // 체크박스 있는지 확인하기
    expect(termsElement).toBeInTheDocument();

    const termsElement2 = screen.getByLabelText("I agree to the terms and conditions"); // label 에 적인 stirng 을 판별
    expect(termsElement2).toBeInTheDocument();

    const submitbuttonElement = screen.getByRole("button"); // 제출버튼 있는지 확인하기
    expect(submitbuttonElement).toBeInTheDocument();
  });
});

// role 에 대해 하려면 document 를 확인해야한다. Testing Library 에 들어가서
