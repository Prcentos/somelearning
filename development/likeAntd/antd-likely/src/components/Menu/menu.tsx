import React, {
  FC,
  useState,
  createContext,
  FunctionComponentElement
} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MODE = "vertical" | "horizontal";

type selectCallback = (index: string) => void;

export interface MenuProps {
  className?: string;
  style?: React.CSSProperties;
  mode?: MODE;
  defaultIndex?: string;
  disabled?: boolean;
  onSelect?: selectCallback;
}

//  menu components's context is to pass the attributes from the parent to child or grandson
interface IMenuContext {
  index?: string;
  onSelect?: selectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

export const Menu: FC<MenuProps> = props => {
  const {
    className,
    style,
    children,
    mode,
    defaultIndex,
    onSelect,
    disabled
  } = props;
  const [activedIndex, setActivedIndex] = useState(defaultIndex);
  const classes = classNames("cl-menu", className, {
    "menu-vertical": mode === "vertical",
    "is-disabled": disabled
  });

  const handleClick = (index: string) => {
    setActivedIndex && setActivedIndex(index);
    onSelect && onSelect(index);
  };
  const passedContext: IMenuContext = {
    index: activedIndex,
    onSelect: handleClick
  };
  const renderChildren = () => {
    // 会在函数内部调用  React.children.map 方法
    return React.Children.map(children, (child, index) => {
      // 当前循环是的每一个child都是一个MenuItem的类型
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // 将需要克隆的元素放在首位，需要添加的属性为第二个参数（对象）
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error(
          "the children of Menu component just the MenuItem or SubMenu"
        );
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {/** {children}  此处直接使用children属性 会有很多细节的东西无法做出判断，因此需要做出修改*/}
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: "horizontal",
  defaultIndex: "0",
  disabled: false
};

export default Menu;
