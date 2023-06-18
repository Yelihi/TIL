import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AppProviders } from "./providers/app-providers";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AppProviders, ...options }); // 여기서 알아서 감싸준다

export * from "@testing-library/react";
export { customRender as render };
