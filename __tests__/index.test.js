import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import App from "../pages/index";

test("check if logo is displayed", async () => {
  render(<App />);
  const logo = await screen.findByTestId("logo");
  expect(logo.length).toBeGreaterThanOrEqual(1);
});
