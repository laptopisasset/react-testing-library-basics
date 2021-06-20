import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceColorWithSpaces } from "./App";

test("button has correct initail color", () => {
  render(<App />);

  // find an element with  role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", {
    name: /change to midnight blue/i,
  });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(colorButton);

  // expect to have a background color blue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);
  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: /change to midnight blue/i,
  });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});

test("Checkbox toggles buttons disable property", () => {
  render(<App />);

  // Firing the checkbox click
  const checkBox = screen.getByRole("checkbox", { name: /disable button/i });
  const colorButton = screen.getByRole("button", {
    name: /change to midnight blue/i,
  });

  expect(checkBox).not.toBeChecked();

  fireEvent.click(checkBox);

  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox);

  expect(colorButton).toBeEnabled();
});

test("Disabled button has gray background and reverts to red", () => {
  render(<App />);

  const checkBox = screen.getByRole("checkbox", { name: /disable button/i });
  const colorButton = screen.getByRole("button", {
    name: /change to midnight blue/i,
  });

  // red background check

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Clicked disabled button has gray background and reverts to blue", () => {
  render(<App />);

  const checkBox = screen.getByRole("checkbox", { name: /disable button/i });
  const colorButton = screen.getByRole("button", {
    name: /change to midnight blue/i,
  });

  // red background check

  fireEvent.click(colorButton);

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("Spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceColorWithSpaces("red")).toBe("red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceColorWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceColorWithSpaces("MediumVoiletRed")).toBe("Medium Voilet Red");
  });
});
