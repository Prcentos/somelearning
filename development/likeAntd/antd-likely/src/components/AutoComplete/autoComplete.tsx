import React, { FC, useState } from "react";
import classNames from "classnames";
import Input, { InputPorps } from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

interface reslutData {
  [propName: string]: any;
}

// 过滤后的数据可能是对象或者字符串
export type filteredData = reslutData | { value: string };

export interface AutoCompleteProps extends Omit<InputPorps, "onSelect"> {
  /** filterDatas 必传 此函数为用户传入的用来筛选数据的逻辑 */
  filterDatas: (value: string) => filteredData[] | Promise<filteredData[]>;
  /** onSelect 可选 此函数是用来处理当用户选中某一项时的具体逻辑 */

  onSelect?: (item: filteredData) => void;
  /** customRenderer 可选 此函数是根据筛选出来的数据定制化用户想要的展示形式 定制化渲染器 */
  customRenderer?: (item: filteredData) => ReactElement;
}

export const AutoComponent: FC<AutoCompleteProps> = props => {
  const { filterDatas, onSelect, value, customRenderer, ...restPorps } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<filteredData[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const rendererTemplate = suggestion => {
    return customRenderer ? customRenderer(suggestion) : suggestion.value;
  };
  const genDropList = () => {
    return (
      <ul>
        suggestions.map((suggestion, index) =>{" "}
        {<li key={index}>{rendererTemplate(suggestion)}</li>})
      </ul>
    );
  };
  return (
    <div>
      <Input value={inputValue} onChange={e => handleChange(e)} />
      {genDropList()}
    </div>
  );
};

export default AutoComponent;
