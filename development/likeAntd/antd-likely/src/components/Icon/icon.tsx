import React, { FC } from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warining"
  | "danger";

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
  className?: string;
}

const Icon: FC<IconProps> = props => {
  const { className, theme, ...restProps } = props;
  const classes = classNames("cl-icon", className, {
    [`icon-${theme}`]: theme
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
