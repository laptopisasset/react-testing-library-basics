import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button has correct initail color", () => {
  render(<App />);

  // find an element with  role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", { name: /change to blue/i });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  // click button
  fireEvent.click(colorButton);

  // expect to have a background color blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);
  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: /change to blue/i });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});

test("Checkbox toggles buttons disable property", () => {
  render(<App />);

  // Firing the checkbox click
  const checkBox = screen.getByRole("checkbox", { name: /disable button/i });
  const colorButton = screen.getByRole("button", { name: /change to blue/i });

  expect(checkBox).not.toBeChecked();

  fireEvent.click(checkBox);

  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox);

  expect(colorButton).toBeEnabled();
});
