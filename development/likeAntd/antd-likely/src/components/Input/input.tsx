import React, { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLELement>, "size"> {
  size?: InputSize;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  prepand?: string | ReactElement;
  append?: string | ReactElement;
  icon?: IconProp;
}

export const Input: FC<InputProps> = props => {
  const {
    className,
    style,
    size,
    disabled,
    icon,
    prepand,
    append,
    ...restProps
  } = props;
  const classes = classNames("cl-input", className, {
    "is-disabled": disabled,
    [`cl-input-${size}`]: size,
    "input-group": prepand || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepand
  });

  // 避免value从undefined变为某一个值（从非受控变为受控是不对的）
  const fixControlledValue = (value: any) => {
    return value == null ? "" : value;
  };
  // 避免同事传递默认值和用户给定值冲突，
  if ("value" in props) {
    restProps.defaultValue && delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={classes} style={style}>
      {prepand && <div>{prepand}</div>}
      {icon && (
        <div>
          <Icon icon={icon} />
        </div>
      )}
      <input disable={disabled} {...restProps} />
      {append && <div>{append}</div>}
    </div>
  );
};

export default Input;
