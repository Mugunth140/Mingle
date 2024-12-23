import React from "react";
import useThemeStore from "../store/useThemeStore";
import { MdSend } from "react-icons/md";
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
            <p>Select a theme for system interface</p>
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
          <br />
          <br />
          <div className="preview-container">
            <h2>Preview</h2>
            <br />
            <p>This is how your system will look like</p>
            <br />
            <div className="preview">
               <div className="preview-card">
                <div className="preview-header">
                  <span><strong>J</strong></span>
                  <div className="preview-name">
                  <h3>John Doe</h3>
                  <p>Online</p>
                  </div>
                </div>
                <br />
               <div className="preview-content">
                <div className="preview-receiver">
                  <p>Hey, How it's going ?</p>
                  <span>8:25 AM</span>
                </div>
                <div className="preview-sender">
                  <p>I'm Good, just working on new some features</p>
                  <span>8:26 AM</span>
                </div>
                </div>
                <br />
                <div className="preview-input">
                  <input type="text" placeholder="Type a message" />
                  <button><MdSend size={28}/></button>
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;