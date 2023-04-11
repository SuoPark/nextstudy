type ThemeConfig = {
  skin: string;

  layout: "vertical" | "horizontal";
};

const themeConfig: ThemeConfig = {
  layout: "vertical" /* vertical | horizontal */,

  skin: "semi-dark" /* default | bordered | semi-dark /*! Note: semi-dark value will only work for Vertical Layout */,
};

export default themeConfig;
