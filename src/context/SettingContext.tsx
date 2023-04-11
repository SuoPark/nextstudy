import themeConfig from "@/configs/themeConfig";
import { createContext, ReactNode, useState } from "react";

interface SettingProps {
  children: ReactNode;
}

export interface Settings {
  skin: string;
  itemIndex: number;
}
export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};

const initSettings: Settings = {
  skin:
    themeConfig.layout === "horizontal" && themeConfig.skin === "semi-dark"
      ? "default"
      : themeConfig.skin,
  itemIndex: 0,
};
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initSettings,
});

export const SettingsProvider = ({ children }: SettingProps) => {
  const [settings, setSettings] = useState<Settings>({ ...initSettings });
  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
  };
  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
