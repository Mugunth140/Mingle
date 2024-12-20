import React from "react";
import useThemeStore from "../store/useThemeStore";
import "../sass/pages/SettingPage.scss";

const SettingPage = () => {

  const themes = [
    { id: "dark", label: "Dark" },
    { id: "light", label: "Light" },
    { id: "cupcake", label: "Cupcake" },
    { id: "emerald", label: "Emerald" },
    { id: "pitch", label: "Pitch" },
    { id: "retro", label: "Retro" },
    { id: "cyberpunk", label: "Cyberpunk" },
    { id: "forest", label: "Forest" },
  ];

  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <>
      <div className="settings-container">
        <div className="settings">
          <div className="theme-container">
            <h2>Theme</h2>
            <br />
            <p>Select a Theme for system interface</p>
            <br />
            <div className="theme-options">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  className={theme === t.id ? "active theme-button" : "theme-button"}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;