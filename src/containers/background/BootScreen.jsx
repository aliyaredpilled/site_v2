import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '../../utils/general';
import './back.scss'; // Убедимся, что стили подключены

const BootScreen = (props) => {
  const dispatch = useDispatch();
  const wall = useSelector((state) => state.wallpaper);
  const [blackout, setBlackOut] = useState(false);

  useEffect(() => {
    if (props.dir < 0) {
      setTimeout(() => {
        console.log("blackout");
        setBlackOut(true);
      }, 4000);
    }
  }, [props.dir]);

  useEffect(() => {
    if (props.dir < 0) {
      if (blackout) {
        if (wall.act == "restart") {
          setTimeout(() => {
            setBlackOut(false);
            setTimeout(() => {
              dispatch({ type: "WALLBOOTED" });
            }, 4000);
          }, 2000);
        }
      }
    }
  }, [blackout, wall.act, props.dir, dispatch]); // Добавили dispatch в зависимости

  return (
    <div className="bootscreen">
      <div className={`flex flex-col items-center ${blackout ? "hidden" : ""}`}>
        <Image 
          src="/img/landing/topson-logo.png" // Уточняем путь к img
          ext 
          w={120} 
          className="mb-4"
        />
        <div className="loading-dots flex space-x-2">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
        </div>
      </div>
    </div>
  );
};

export default BootScreen; 