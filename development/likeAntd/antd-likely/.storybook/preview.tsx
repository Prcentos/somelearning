import "!style-loader!css-loader!sass-loader!../src/styles/global.scss";
import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
};
const styles: CSSProperties = {
  padding: "20px 40px"
};

const StyleDecorator = (storyFn: any): ReactElement => (
  <div style={styles}>
    <h3>组件演示：</h3>
    {storyFn()}
  </div>
);

addDecorator(StyleDecorator);
addDecorator(withInfo);
addParameters({
  info: {
    text: "",
    inline: true,
    header: false
  }
});
