import { SyntheticEvent } from "react";
import { useState } from "react";

interface IProps {
  initialValue?: string;
}

const useTabs = (props: IProps) => {
  const [value, setValue] = useState(props.initialValue || "");
  const onChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return { value, onChange, setValue };
};

export default useTabs;
