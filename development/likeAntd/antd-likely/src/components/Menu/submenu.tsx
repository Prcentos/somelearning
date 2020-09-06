import React, {
  FC,
  useContext,
  ReactElement,
  FunctionComponentElement
} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  index?: string;
  title: string;
}

export const SubMenu: FC<SubMenuProps> = props => {
  const { className, style, index, disabled, children, title } = props;
  const context = useContext(MenuContext);
  const classes = classNames("cl-menu-item  cl-submenu", className, {
    "is-actived": context.index === index,
    "is-disabled": disabled
  });

  const renderChildren = (): ReactElement => {
    const childComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error("the children of SubMenu component, just the MenuItem");
      }
    });
    return <ul className="cl-submenu">{childComponent}</ul>;
  };

  return (
    <li key={index} className={classes} style={style}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
