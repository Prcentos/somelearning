import React, { CSSProperties } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Input from "./input";

const defaultInput = () => {
  return <Input defaultValue="10" value="20" />;
};

storiesOf("Input Component", module).add("Input", defaultInput);
// .add('不同尺寸的 Button', buttonWithSize)
// .add('不同类型的 Button', buttonWithType)
