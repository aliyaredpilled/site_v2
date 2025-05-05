import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../actions";
import { getTreeValue } from "../../actions";
import { Icon } from "../../utils/general";
import Battery from "../shared/Battery";
import { scrollToSectionWithOffset } from "../../utils/scrollUtils";
import "./searchpane.scss";
import "./sidepane.scss";
import "./startmenu.scss";

export * from "./start";
export * from "./widget";

export const DesktopApp = () => {
  const deskApps = useSelector((state) => {
    var arr = { ...state.desktop };
    var tmpApps = [...arr.apps];

    if (arr.sort == "name") {
      tmpApps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    } else if (arr.sort == "size") {
      tmpApps.sort((a, b) => {
        var anm = a.name,
          bnm = b.name;

        return anm[bnm.charCodeAt(0) % anm.length] >
          bnm[anm.charCodeAt(0) % bnm.length]
          ? 1
          : -1;
      });
    } else if (arr.sort == "date") {
      tmpApps.sort((a, b) => {
        var anm = a.name,
          bnm = b.name;
        var anml = anm.length,
          bnml = bnm.length;

        return anm[(bnml * 13) % anm.length] > bnm[(anml * 17) % bnm.length]
          ? 1
          : -1;
      });
    }

    arr.apps = tmpApps;
    return arr;
  });
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.setting.person.theme);

  const lightLogoPath = '/img/ui/topson_logo.png';
  const darkLogoPath = '/img/landing/topson-logo.png';

  // Маппинг имен иконок на ID секций
  const scrollTargetMapping = {
    "О нас": "about",
    "Проекты": "projects",
    "Партнеры": "partners",
    "Контакты": "contact",
  };

  // Проверка, является ли иконка SVG файлом
  const isSvgIcon = (icon) => {
    return typeof icon === 'string' && icon.endsWith('.svg');
  };

  return (
    <div className="desktopCont">
      <style>
        {`
          /* Стили для более выделяющихся SVG иконок */
          .svg-desktop-icon {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
            border-radius: 12px;
            transition: all 0.3s ease;
            padding: 6px;
            background: rgba(0, 62, 146, 0.6);
          }
          
          .svg-desktop-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.9);
            background: rgba(0, 78, 180, 0.7);
          }
          
          /* Специальный стиль для увеличенной иконки "Партнеры" */
          .partners-icon-img {
            transform: scale(1.25);
            transition: all 0.3s ease;
          }
          
          .partners-icon-img:hover {
            transform: scale(1.45);
          }
        `}
      </style>
      {!deskApps.hide &&
        deskApps.apps.map((app, i) => {
          const targetId = scrollTargetMapping[app.name]; // Найти ID для скролла
          // Увеличиваем размер иконок
          const iconSize = Math.round(deskApps.size * 58);
          // Проверяем, является ли это иконкой "Партнеры"
          const isPartnersIcon = app.name === "Партнеры";

          if (targetId) {
            // --- Иконка для скролла ---
            return (
              <div 
                key={i} 
                className="dskApp scrollLink" 
                tabIndex={0} 
                onClick={() => scrollToSectionWithOffset(targetId)} // Используем новую функцию
                title={`Перейти к секции ${app.name}`} 
              >
                {isSvgIcon(app.icon) ? (
                  <div className="svg-icon-wrapper">
                    <img 
                      src={app.icon} 
                      width={iconSize} 
                      height={iconSize} 
                      alt={app.name}
                      className={`dskIcon prtclk ${isPartnersIcon ? 'partners-icon-img' : ''}`}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <Icon
                    className="dskIcon prtclk" 
                    src={app.icon} 
                    color={app.color} 
                    pr 
                    width={iconSize}
                    menu="app"
                  />
                )}
                <div className="appName">{app.name}</div>
              </div>
            );
          } else {
            // --- Обычная иконка приложения ---
            return (
              <div key={i} className="dskApp" tabIndex={0}>
                {isSvgIcon(app.icon) ? (
                  <div className="svg-icon-wrapper">
                    <img 
                      src={app.icon} 
                      width={iconSize} 
                      height={iconSize} 
                      alt={app.name}
                      className={`dskIcon prtclk ${isPartnersIcon ? 'partners-icon-img' : ''}`}
                      style={{ objectFit: 'contain' }}
                      onClick={() => {
                        if (app.action) {
                          if (app.action === "EXTERNAL") {
                            window.open(app.payload, "_blank");
                          } else {
                            const payload = app.action === 'SETTINGS' ? 'full' : (app.payload || 'cstm');
                            dispatch(Actions[app.action](payload));
                          }
                        }
                      }}
                    />
                  </div>
                ) : (
                  <Icon
                    className="dskIcon prtclk"
                    click={app.action} 
                    payload={app.action === 'SETTINGS' ? 'full' : (app.payload || 'cstm')}
                    src={app.icon}
                    color={app.color} 
                    pr 
                    width={iconSize}
                    menu="app"
                  />
                )}
                <div className="appName">{app.name}</div>
              </div>
            );
          }
        })}
      {/* Topson Logo */}
      <img 
        src={theme === 'dark' ? darkLogoPath : lightLogoPath} 
        alt="Topson Logo" 
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '100px', // Adjust size as needed
          height: 'auto',
          opacity: 0.7, // Make it slightly transparent
          pointerEvents: 'none' // Prevent interaction
        }} 
      />
    </div>
  );
};

export const BandPane = () => {
  const sidepane = useSelector((state) => state.sidepane);

  return (
    <div
      className="bandpane dpShad"
      data-hide={sidepane.banhide}
      style={{ "--prefix": "BAND" }}
    >
      <div className="bandContainer">
        <Icon
          className="hvlight"
          width={17}
          click="CALCUAPP"
          payload="togg"
          open="true"
          src="calculator"
        />
        {/* <Icon
          className="hvlight"
          width={17}
          click="SPOTIFY"
          payload="togg"
          open="true"
          src="spotify"
        /> */}
        <Icon
          className="hvlight"
          width={17}
          click="NOTEPAD"
          payload="togg"
          src="notepad"
        />
      </div>
    </div>
  );
};

export const SidePane = () => {
  const sidepane = useSelector((state) => state.sidepane);
  const setting = useSelector((state) => state.setting);
  const tasks = useSelector((state) => state.taskbar);
  const [pnstates, setPnstate] = useState([]);
  const dispatch = useDispatch();

  let [btlevel, setBtLevel] = useState("");
  const childToParent = () => {};

  const clickDispatch = (event) => {
    var action = {
      type: event.target.dataset.action,
      payload: event.target.dataset.payload,
    };

    if (action.type) {
      if (action.type != action.type.toUpperCase()) {
        Actions[action.type](action.payload);
      } else dispatch(action);
    }
    // For battery saver
    if (action.payload === "system.power.saver.state") setBrightness();
  };

  const vSlider = document.querySelector(".vSlider");
  const bSlider = document.querySelector(".bSlider");

  const setVolume = (e) => {
    var aud = 3;
    if (e.target.value < 70) aud = 2;
    if (e.target.value < 30) aud = 1;
    if (e.target.value == 0) aud = 0;

    dispatch({ type: "TASKAUDO", payload: aud });

    sliderBackground(vSlider, e.target.value);
  };

  function sliderBackground(elem, e) {
    elem.style.setProperty(
      "--track-color",
      `linear-gradient(90deg, var(--clrPrm) ${e - 3}%, #888888 ${e}%)`,
    );
  }

  const setBrightness = (e) => {
    var brgt = document.getElementById("brightnessSlider").value;
    if (!e) {
      // Battery saver
      const state = setting.system.power.saver.state;
      const factor = state ? 0.7 : 100 / 70;
      const newBrgt = brgt * factor;
      setBrightnessValue(newBrgt);
      document.getElementById("brightnessSlider").value = newBrgt;
    } else {
      // Brightness slider
      setBrightnessValue(brgt);
    }
  };

  function setBrightnessValue(brgt) {
    document.getElementById("brightoverlay").style.opacity = (100 - brgt) / 100;
    dispatch({
      type: "STNGSETV",
      payload: {
        path: "system.display.brightness",
        value: brgt,
      },
    });
    sliderBackground(bSlider, brgt);
  }

  useEffect(() => {
    sidepane.quicks.map((item, i) => {
      if (item.src == "nightlight") {
        if (pnstates[i]) document.body.dataset.sepia = true;
        else document.body.dataset.sepia = false;
      }
    });
  });

  useEffect(() => {
    // console.log("ok")
    var tmp = [];
    for (var i = 0; i < sidepane.quicks.length; i++) {
      var val = getTreeValue(setting, sidepane.quicks[i].state);
      if (sidepane.quicks[i].name == "Theme") val = val == "dark";
      tmp.push(val);
    }

    setPnstate(tmp);
  }, [setting, sidepane]);

  return (
    <div
      className="sidePane dpShad"
      data-hide={sidepane.hide}
      style={{ "--prefix": "PANE" }}
    >
      <div className="quickSettings p-5 pb-8">
        <div className="qkCont">
          {sidepane.quicks.map((qk, idx) => {
            return (
              <div key={idx} className="qkGrp">
                <div
                  className="qkbtn handcr prtclk"
                  onClick={clickDispatch}
                  data-action={qk.action}
                  data-payload={qk.payload || qk.state}
                  data-state={pnstates[idx]}
                >
                  <Icon
                    className="quickIcon"
                    ui={qk.ui}
                    src={qk.src}
                    width={14}
                    invert={pnstates[idx] ? true : null}
                  />
                </div>
                <div className="qktext">{qk.name}</div>
              </div>
            );
          })}
        </div>
        <div className="sliderCont">
          <Icon className="mx-2" src="brightness" ui width={20} />
          <input
            id="brightnessSlider"
            className="sliders bSlider"
            onChange={setBrightness}
            type="range"
            min="10"
            max="100"
            defaultValue="100"
          />
        </div>
        <div className="sliderCont">
          <Icon className="mx-2" src={"audio" + tasks.audio} ui width={18} />
          <input
            className="sliders vSlider"
            onChange={setVolume}
            type="range"
            min="0"
            max="100"
            defaultValue="100"
          />
        </div>
      </div>
      <div className="p-1 bottomBar">
        <div className="px-3 battery-sidepane">
          <Battery pct />
        </div>
      </div>
    </div>
  );
};

export const CalnWid = () => {
  const sidepane = useSelector((state) => state.sidepane);
  const [loaded, setLoad] = useState(false);

  const [collapse, setCollapse] = useState("");

  const collapseToggler = () => {
    collapse === "" ? setCollapse("collapse") : setCollapse("");
  };

  useEffect(() => {
    if (!loaded) {
      setLoad(true);
      // Убедимся, что объект window.dycalendar доступен
      if (window.dycalendar) { 
        window.dycalendar.draw({
          target: "#dycalendar",
          type: "month",
          dayformat: "ddd",        
          monthformat: "full",       
          prevnextbutton: "show",
          highlighttoday: true,
          // Явно передаем параметры локализации
          localization: {
            locale: 'ru', // Русская локаль
            dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], // Краткие русские дни
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'] // Полные русские месяцы
          }
        });
      } else {
        console.error("dycalendar library is not loaded.");
      }
    }
  }, [loaded]); // Зависимость для выполнения один раз

  return (
    <div
      className={`calnpane ${collapse} dpShad`}
      data-hide={sidepane.calhide}
      style={{ "--prefix": "CALN" }}
    >
      <div className="topBar pl-4 text-sm">
        <div className="date">
          {/* Заголовок календаря */} 
          {new Date().toLocaleDateString("ru-RU", { // Убедимся, что здесь ru-RU
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="collapser p-2 m-4 rounded" onClick={collapseToggler}>
          {collapse === "" ? (
            <Icon fafa="faChevronDown" />
          ) : (
            <Icon fafa="faChevronUp" />
          )}
        </div>
      </div>
      <div id="dycalendar"></div>
    </div>
  );
};
