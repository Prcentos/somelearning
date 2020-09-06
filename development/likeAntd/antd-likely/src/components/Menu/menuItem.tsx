import React, { FC, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const MenuItem: FC<MenuItemProps> = props => {
  const { index, className, style, children, disabled } = props;
  const context = useContext(MenuContext);
  const classes = classNames("cl-menu-item", className, {
    "is-disabled": disabled,
    "is-actived": context.index === index
  });

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string")
      context.onSelect(index);
  };

  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};
MenuItem.defaultProps = {
  index: "0",
  disabled: false
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
