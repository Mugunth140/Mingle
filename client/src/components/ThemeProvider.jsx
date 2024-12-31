import useThemeStore from "../store/useThemeStore";
import PropTypes from 'prop-types';

const themes = {
  dark: {
    "--base": "#4b4b50",
    "--primary": "#F6F1F4",
    "--secondary": "#1E232B",
    "--accent": "#6D3CEE",
    "--neutral": "#8C8C8C",
  },
  light: {
    "--base": "#efefef",
    "--primary": "#040404",
    "--secondary": "#ffffff",
    "--neutral": "#3D4451",
    "--accent": "#37CDBe",
  },
  cupcake: {
    "--base": "#FCC5D4",
    "--primary": "#003844",
    "--secondary": "#F6F7DE",
    "--neutral": "#C9C19F",
    "--accent": "#A7D49B",
  },
  emerald: {
    "--base": "#1E232B",
    "--primary": "#F6F1F4",
    "--secondary": "#030426",
    "--neutral": "#8C8C8C",
    "--accent": "#8120E9",
  },
  retro: {
    "--base": "#E4D8B4",
    "--primary": "#F06A7F",
    "--secondary": "#424651",
    "--neutral": "#7D7259",
    "--accent": "#EBC55C",
  },
  cyberpunk: {
    "--base": "#D3D0CB",
    "--primary": "#010101",
    "--secondary": "#FCEE09",
    "--neutral": "#FF003C",
    "--accent": "#00F0FF",
  },
  forest: {
    "--base": "#FAE3C6",
    "--primary": "#100B00",
    "--secondary": "#65B891",
    "--neutral": "#243B4A",
    "--accent": "#D99330",
  },
  pitch: {
    "--base": "#1e1e1e",
    "--primary": "#f0f0f0",
    "--secondary": "#000",
    "--neutral": "#5D5656",
    "--accent": "#531ace",
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
        "--base": themes[theme]["--base"],
      }}
    >
      {children}
    </div>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
