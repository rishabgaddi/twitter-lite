import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders Header component", () => {
  render(<App />);
  expect(screen.getByText("Welcome to Twitter Lite")).toBeInTheDocument();
});
