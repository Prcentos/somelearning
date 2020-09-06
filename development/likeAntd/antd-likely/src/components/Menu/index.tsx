import { FC } from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";
import SubMenu, { SubMenuProps } from "./subMenu";

// 重新确认导出菜单组件的类型是包含了menu和menuitem以及submenu的合集
export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

// 将导出组件重命名，丙炔强制声明为 IMenuComponent类型
const TransMenu = Menu as IMenuComponent;

// 并且将MenuItem和SubMenu挂到其上方便用户一次导入
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

// 真正导出的组件
export default TransMenu;
