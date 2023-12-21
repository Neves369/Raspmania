import { DefaultTheme } from "react-native-paper";

export const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d00000",
    secondary: "#6a040f",
    tertiary: "#9d0208",
    shadow: "#9d020880",
    background: "#fafafa",
    surface: "#f8f9fa",
    text: "#495057",
    text2: "#f8f9fa",
    error: "#f13a59",
  },
};

export const dark = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3d3d3d",
    secondary: "#335c67",
    tertiary: "#1f1f1f",
    shadow: "#3d3d3d",
    background: "#000000",
    surface: "#3d3d3d",
    text: "white",
    text2: "#f8f9fa",
    error: "white",
  },
};
