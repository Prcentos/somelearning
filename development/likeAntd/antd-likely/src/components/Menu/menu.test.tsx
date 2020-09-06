import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test"
};

const testVerticalProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  mode: "vertical"
};
const genMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  );
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activedElement: HTMLElement,
  disabledELement: HTMLElement;
describe("test the menu and menuItem component", () => {
  beforeEach(() => {
    wrapper = render(genMenu(testProps));
    menuElement = wrapper.getByTestId("test-menu");
    activedElement = wrapper.getByText("active");
    disabledELement = wrapper.getByText("disabled");
  });
  it("should render the correct menu and menuItem base on the default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("cl-menu test");
    expect(menuElement.tagName).toEqual("UL");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activedElement).toHaveClass("cl-menu-item is-actived");
    expect(disabledELement).toHaveClass("cl-menu-item is-disabled");
  });

  it("click the item should change the active and call the right callback", () => {
    const fireEle = wrapper.getByText("xyz");
    fireEvent.click(fireEle);
    expect(fireEle).toHaveClass("is-actived");
    expect(activedElement).not.toHaveClass("is-actived");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledELement);
    expect(disabledELement).not.toHaveClass("is-actived");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });

  it("should render vertical mode menu, when the mode is vertical", () => {
    cleanup();
    let wrapper: RenderResult = render(genMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
});
