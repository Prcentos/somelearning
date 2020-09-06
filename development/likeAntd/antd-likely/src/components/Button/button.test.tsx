import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const defaultProps = {
  onClick: jest.fn()
};

const testProps: ButtonProps = {
  btnType: "default",
  size: "lg",
  className: "klass"
};

const disableProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
};

describe("test Button component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render the correct component base on different props", () => {
    const wrapper = render(<Button {...testProps}>Hello</Button>);
    const element = wrapper.getByText("Hello");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-default btn-lg klass");
  });

  it("should render a link button, when btnType equals link and href is provided", () => {
    const wrapper = render(
      <Button btnType="link" href="www.baidu.com">
        Link
      </Button>
    );
    const element = wrapper.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveAttribute("href");
  });

  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disableProps}>Disabled</Button>);
    const element = wrapper.getByText("Disabled") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disableProps.onClick).not.toHaveBeenCalled();
  });
});
