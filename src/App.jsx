import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import "./i18nextConf";
import "./index.css";

import ActMenu from "./components/menu";
import {
  BandPane,
  CalnWid,
  DesktopApp,
  SidePane,
  StartMenu,
  WidPane,
} from "./components/start";
import Taskbar from "./components/taskbar";
import { Background, BootScreen, LockScreen, ShutdownScreen } from "./containers/background";

// Импорт компонента лендинга
import LandingPage from "./components/LandingPage/LandingPage";

import { loadSettings } from "./actions";
import * as Applications from "./containers/applications";
import * as Drafts from "./containers/applications/draft";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <meta charSet="UTF-8" />
      <title>404 - Page</title>
      <script src="https://win11.blueedge.me/script.js"></script>
      <link rel="stylesheet" href="https://win11.blueedge.me/style.css" />
      {/* partial:index.partial.html */}
      <div id="page">
        <div id="container">
          <h1>:(</h1>
          <h2>
            Your PC ran into a problem and needs to restart. We're just
            collecting some error info, and then we'll restart for you.
          </h2>
          <h2>
            <span id="percentage">0</span>% complete
          </h2>
          <div id="details">
            <div id="qr">
              <div id="image">
                <img src="https://win11.blueedge.me/img/qr.png" alt="QR Code" />
              </div>
            </div>
            <div id="stopcode">
              <h4>
                For more information about this issue and possible fixes, visit
                <br />{" "}
                <a href="https://github.com/blueedgetechno/win11React/issues">
                  https://github.com/blueedgetechno/win11React/issues
                </a>{" "}
              </h4>
              <h5>
                If you call a support person, give them this info:
                <br />
                Stop Code: {error.message}
              </h5>
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          </div>
        </div>
      </div>
      {/* partial */}
    </div>
  );
}

function App() {
  const apps = useSelector((state) => state.apps);
  const wall = useSelector((state) => state.wallpaper);
  const originalDispatch = useDispatch();
  
  // Создаем улучшенный диспетчер, который будет закрывать предыдущие меню
  const dispatch = (action) => {
    // Проверяем, является ли действие открытием меню
    const openActions = ["STARTSHW", "STARTOGG", "STARTSRC", "BANDTOGG", "PANETOGG", "WIDGTOGG", "CALNTOGG"];
    
    if (openActions.includes(action.type)) {
      // Если открывается любое меню, закрываем все остальные
      const closeActions = [
        {type: "STARTHID"}, // Закрываем меню Пуск
        {type: "BANDHIDE"}, // Закрываем панель уведомлений
        {type: "PANEHIDE"}, // Закрываем боковую панель
        {type: "WIDGHIDE"}, // Закрываем виджеты
        {type: "CALNHIDE"}, // Закрываем календарь
        {type: "MENUHIDE"}  // Закрываем контекстное меню
      ];
      
      // Фильтруем, чтобы не закрывать то меню, которое сейчас открываем
      closeActions.forEach(closeAction => {
        // Не закрываем меню, соответствующее текущему действию открытия
        if ((action.type === "STARTSHW" || action.type === "STARTOGG" || action.type === "STARTSRC") && 
            closeAction.type === "STARTHID") {
          return;
        }
        
        if (action.type === "BANDTOGG" && closeAction.type === "BANDHIDE") return;
        if (action.type === "PANETOGG" && closeAction.type === "PANEHIDE") return;
        if (action.type === "WIDGTOGG" && closeAction.type === "WIDGHIDE") return;
        if (action.type === "CALNTOGG" && closeAction.type === "CALNHIDE") return;
        
        // Отправляем действие закрытия для других меню
        originalDispatch(closeAction);
      });
    }
    
    // Выполняем исходное действие
    return originalDispatch(action);
  };

  const afterMath = (event) => {
    var ess = [
      ["START", "STARTHID"],
      ["BAND", "BANDHIDE"],
      ["PANE", "PANEHIDE"],
      ["WIDG", "WIDGHIDE"],
      ["CALN", "CALNHIDE"],
      ["MENU", "MENUHIDE"],
    ];

    var actionType = "";
    try {
      actionType = event.target.dataset.action || "";
    } catch (err) {}

    var actionType0 = getComputedStyle(event.target).getPropertyValue(
      "--prefix",
    );

    ess.forEach((item, i) => {
      if (!actionType.startsWith(item[0]) && !actionType0.startsWith(item[0])) {
        dispatch({
          type: item[1],
        });
      }
    });
  };

  // window.oncontextmenu = (e) => { // Temporarily commented out
  //   afterMath(e);
  //   e.preventDefault();
  //   // dispatch({ type: 'GARBAGE'});
  //   var data = {
  //     top: e.clientY,
  //     left: e.clientX,
  //   };
  //
  //   if (e.target.dataset.menu != null) {
  //     data.menu = e.target.dataset.menu;
  //     data.attr = e.target.attributes;
  //     data.dataset = e.target.dataset;
  //     dispatch({
  //       type: "MENUSHOW",
  //       payload: data,
  //     });
  //   }
  // };

  window.onclick = afterMath;

  window.onload = (e) => {
    dispatch({ type: "WALLBOOTED" });
  };

  useEffect(() => {
    if (!window.onstart) {
      loadSettings();
      window.onstart = setTimeout(() => {
        dispatch({ type: "WALLBOOTED" });
      }, 5000);
    }
  }, [dispatch]);

  // Эффект для управления прокруткой body
  useEffect(() => {
    const isContentVisible = wall.booted && !wall.locked;
    
    if (isContentVisible) {
      // Если контент виден, разрешаем прокрутку
      document.body.style.overflow = '';
    } else {
      // Если идет загрузка или экран блокировки, запрещаем прокрутку
      document.body.style.overflow = 'hidden';
    }

    // Функция очистки: возвращаем стандартную прокрутку при размонтировании App
    return () => {
      document.body.style.overflow = '';
    };
  }, [wall.booted, wall.locked]); // Зависимости эффекта

  return (
    <div className="App" style={{ position: 'relative' }}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {/* Экраны загрузки, блокировки и выключения */} 
        {!wall.booted && wall.act !== 'shutdn' ? <BootScreen dir={wall.dir} /> : null} 
        {wall.locked && wall.act !== 'shutdn' ? <LockScreen dir={wall.dir} /> : null} 
        {wall.act === 'shutdn' ? <ShutdownScreen /> : null} {/* Показываем экран выключения */}

        {/* Основное содержимое приложения (рабочий стол и т.д.) */}
        {/* Обертка рабочего стола и лендинга - показываем только если не выключение */} 
        {wall.act !== 'shutdn' && (
          <div style={{
            position: 'relative',
            zIndex: 0
          }}>
            {/* Основной интерфейс - показываем только если загружено и не заблокировано */} 
            {wall.booted && !wall.locked && (
              <div className={`appwrap`}>
                <Background />
                <div className="desktop" data-menu="desk">
                  <DesktopApp />
                  {Object.keys(Applications).map((key, idx) => {
                    var WinApp = Applications[key];
                    return <WinApp key={idx} />;
                  })}
                  {Object.keys(apps)
                    .filter((x) => x != "hz")
                    .map((key) => apps[key])
                    .map((app, i) => {
                      if (app.pwa) {
                        var WinApp = Drafts[app.data.type];
                        return <WinApp key={i} icon={app.icon} {...app.data} />;
                      }
                    })}
                  <StartMenu />
                  <BandPane />
                  <SidePane />
                  <WidPane />
                  <CalnWid />
                </div>
                <Taskbar />
                <ActMenu />
              </div>
            )}

            {/* Лендинг - показываем всегда, когда не выключение */}
            <LandingPage />
          </div>
        )}

      </ErrorBoundary>
    </div>
  );
}

export default App;
