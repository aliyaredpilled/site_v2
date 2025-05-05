import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../actions";
import { Image, ToolBar } from "../../../utils/general";
import LangSwitch from "./assets/Langswitch";
import "./assets/settings.scss";
import data from "./assets/settingsData.json";

export const Settings = () => {
  const wnapp = useSelector((state) => state.apps.settings);
  const theme = useSelector((state) => state.setting.person.theme);
  const dispatch = useDispatch();

  const wall = useSelector((state) => state.wallpaper);

  const [page, setPage] = useState("Personalisation"); // default Personalisation
  const [nav, setNav] = useState("");
  const [updating, setUpdating] = useState(false);
  const [upmodalOpen, setUpmodalOpen] = useState(false);

  const themechecker = {
    default: "light",
    dark: "dark",
    ThemeA: "dark",
    ThemeB: "dark",
    ThemeD: "light",
    ThemeC: "light",
  };

  const handleWallAndTheme = (e) => {
    var payload = e.target.dataset.payload;
    var theme_nxt = themechecker[payload.split("/")[0]],
      src = payload;

    if (theme_nxt != theme) {
      changeTheme();
    }

    dispatch({
      type: "WALLSET",
      payload: src,
    });
  };

  const userName = useSelector((state) => state.setting.person.name);

  return (
    <div
      className="settingsApp floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Settings"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <nav className={nav}>
            <div className="nav_top">
              <div className="account" onClick={() => setPage("Accounts")}>
                <img
                  src="/img/landing/Сервисы/Entrance_cat.png"
                  alt="User Avatar"
                  height={60}
                  width={60}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <p>{userName}</p>
                  <p>Local Account</p>
                </div>
              </div>
              <input
                type="text"
                className="search"
                placeholder="Find a setting "
                name="search"
              />
            </div>
            <div className="nav_bottom win11Scroll">
              {Object.keys(data).map((e) => {
                return (
                  <div
                    key={e}
                    className={`navLink ${e === page ? "selected" : ""}`}
                    onClick={() => {
                      // avoid inline functions
                      setPage(e);
                    }}
                  >
                    <img
                      src={`img/settings/${e}.webp`}
                      alt=""
                      height={16}
                      width={16}
                    />
                    {e}
                  </div>
                );
              })}
              <div className="marker"></div>
            </div>
          </nav>

          {Object.keys(data).map((e) => {
            return (
              page === e && (
                <main key={e}>
                  <h1>{e}</h1>
                  <div className="tilesCont win11Scroll">
                    {data[e].map((item, i) => { // Changed variable name back to 'item' to avoid conflict
                      switch (item.type) { // Use item.type
                        // Removed cases for sysTop, netTop, accountsTop, timeTop, langSwitcher, updateTop, subHeading, spacer, tile etc.
                        // because they are not present in the current settingsData.json
                        // but kept the structure
                        case "personaliseTop":
                          return (
                            <div key={i} className="personaliseTop">
                              <img
                                className="mainImg"
                                src={`img/wallpaper/${wall.src}`}
                                alt=""
                              />
                              <div>
                                <h3>Select a theme to apply</h3>
                                <div className="bgBox">
                                  {wall.themes.map((themeItem, themeIdx) => { // Changed variable names
                                    return (
                                      <Image
                                        key={themeIdx} // Use themeIdx
                                        className={
                                          wall.src.includes(themeItem) ? "selected" : "" // Use themeItem
                                        }
                                        src={`img/wallpaper/${themeItem}/img0.jpg`} // Use themeItem
                                        ext
                                        onClick={handleWallAndTheme}
                                        click="WALLSET"
                                        payload={`${themeItem}/img0.jpg`} // Use themeItem
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        default:
                          // Log error only if the type is unexpected based on current data
                          if (item.type !== 'personaliseTop') {
                             console.log(
                              `Warning: Unexpected item type '${item.type}' found in settingsData.json for page '${e}'.`,
                            );
                          }
                          return null; // Return null for any unexpected type
                      }
                    })}
                  </div>
                </main>
              )
            );
          })}

          {upmodalOpen && (
            <>
              <div className="absolute z-30 bg-black bg-opacity-60 h-full w-full top-0 left-0"></div>

              <div
                className="absolute top-[50%] left-[50%] z-50 rounded"
                style={{
                  transform: `translateX(-50%) translateY(-50%)`,
                  background: `var(--wintheme)`,
                  padding: `1.5rem`,
                }}
              >
                <h1
                  style={{
                    marginBottom: `10px`,
                  }}
                  className="text-2xl font-semibold"
                >
                  Restart required
                </h1>
                <p>
                  Some changes will not take effect until you restart your
                  device.
                </p>

                <div
                  className="flex"
                  style={{
                    marginTop: `14px`,
                  }}
                >
                  <button
                    style={{
                      padding: "10px",
                      backgroundColor: "var(--clrPrm)",
                      color: "var(--alt-txt)",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      // Clear the cache and reload the page
                      window.location =
                        window.location.href + `?clearCache=${Math.random()}`;
                    }}
                    className="flex-1 rounded border-none hover:opacity-95"
                  >
                    Restart now
                  </button>
                  <button
                    style={{
                      padding: "10px",
                      color: "var(--sat-txt)",
                    }}
                    className="flex-1 rounded border"
                    onClick={() => {
                      setUpmodalOpen(false);
                    }}
                  >
                    Restart later
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="navMenuBtn" onClick={() => setNav(nav ? "" : "open")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 48 48"
              width={24}
              height={24}
            >
              <path d="M5.5 9a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
