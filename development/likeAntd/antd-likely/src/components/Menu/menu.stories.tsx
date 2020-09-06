import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./submenu";

const menu = () => (
  <Menu defaultIndex="0" onSelect={action("menu")}>
    <MenuItem>cool link1</MenuItem>
    <MenuItem disabled>cool link2</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>drop1</MenuItem>
    </SubMenu>
    <SubMenu title="opened">
      <MenuItem>opened1</MenuItem>
    </SubMenu>
    <MenuItem>cool link3</MenuItem>
  </Menu>
);
storiesOf("Menu Component", module).add("Menu", menu);
