import React from "react";
import useThemeStore from "../store/useThemeStore";

const themes = {
  dark: {
    "--primary": "#F6F1F4",
    "--secondary": "#1E232B",
    "--accent": "#6D3CEE",
    "--neutral": "#8C8C8C",
    "--base": "#3d4451",
  },
  light: {
    "--base": "#efefef",
    "--primary": "#040404",
    "--secondary": "#ffffff",
    "--neutral": "#3D4451",
    "--accent": "#37CDBe",
  },
  cupcake: {
    "--base": "#FFFFFF",
    "--primary": "#003844",
    "--secondary": "#F6F7DE",
    "--neutral": "#C9C19F",
    "--accent": "#37CDBe",
  },
  emerald: {
    "--base": "#1E232B",
    "--primary": "#F6F1F4",
    "--secondary": "#030426",
    "--neutral": "#8C8C8C",
    "--accent": "#531ace",
  },
  retro: {
    "--base": "#E4D8B4",
    "--primary": "#F06A7F",
    "--secondary": "#424651",
    "--neutral": "#7D7259",
    "--accent": "#EBDC99",
  },
  cyberpunk: {
    "--base": "#1A1A1A",
    "--primary": "#050A0E",
    "--secondary": "#FCEE09",
    "--neutral": "#FF003C",
    "--accent": "#00F0FF",
  },
  forest: {
    "--base": "#171212",
    "--primary": "#100B00",
    "--secondary": "#65B891",
    "--neutral": "#243B4A",
    "--accent": "#D99330",
  },
  pitch: {
    "--base": "#E9E7E7",
    "--primary": "#f0f0f0",
    "--secondary": "#000",
    "--neutral": "#5D5656",
    "--accent": "#1D1A31",
  },
};

const ThemeProvider = ({ children }) => {
  const { theme } = useThemeStore();

  return (
    <div
      data-theme={theme}
      style={{
        "--primary": themes[theme]["--primary"],
        "--secondary": themes[theme]["--secondary"],
        "--accent": themes[theme]["--accent"],
        "--neutral": themes[theme]["--neutral"],
      }}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
