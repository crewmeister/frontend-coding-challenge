import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

beforeAll(() => {
  // add window.matchMedia
  // this is necessary for the date picker to be rendered in desktop mode.
  // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query) => ({
      media: query,
      // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
      matches: query === "(pointer: fine)",
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

afterAll(() => {
  delete window.matchMedia;
});

test("renders absence type filter", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { name: "Absence Type Filter" });
  expect(input).toBeInTheDocument();
});

test("accepts absence type filter", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { name: "Absence Type Filter" });
  fireEvent.change(input, { target: { value: "Max" } });
  expect(input.value).toBe("Max");
});

test("renders date type filter", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { name: "Date Filter" });
  expect(input).toBeInTheDocument();
});

test("accepts date filter", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { name: "Date Filter" });
  fireEvent.change(input, { target: { value: "09012022" } });
  expect(input.value).toBe("09/01/2022");
});

test("renders loading state", () => {
  render(<App />);
  const input = screen.getByRole("heading", { name: "Loading" });
  expect(input).toBeInTheDocument();
});