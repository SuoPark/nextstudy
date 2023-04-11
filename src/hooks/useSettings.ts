import { SettingsContext } from "@/context/SettingContext";
import { useContext } from "react";

const useSettings = () => {
  return useContext(SettingsContext);
};

export default useSettings;
