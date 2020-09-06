import React from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/submenu";
import Icon from "./components/Icon/icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
function App() {
  return (
    <div className="App">
      <Icon theme="primary" icon="coffee" size="lg" />
      <header className="App-header">
        <Menu defaultIndex="0">
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
        <Button autoFocus className="custom">
          {" "}
          Hello{" "}
        </Button>
        <Button
          size="lg"
          onClick={e => {
            e.preventDefault();
            alert(123);
          }}
        >
          {" "}
          Hello{" "}
        </Button>
        <Button btnType="danger"> Hello </Button>
        <Button btnType="link" href="http://www.baidu.com">
          {" "}
          Baidu{" "}
        </Button>
        <Button btnType="link" href="http://www.baidu.com" target="_blank">
          {" "}
          Baidu{" "}
        </Button>
        <Button btnType="link" href="http://www.baidu.com" disabled>
          {" "}
          Baidu{" "}
        </Button>
      </header>
    </div>
  );
}

export default App;
