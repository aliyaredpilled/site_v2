import React from 'react';
import { useSelector } from 'react-redux';
import './back.scss'; // Убедимся, что стили подключены

const Background = () => {
  const wall = useSelector((state) => state.wallpaper);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(/img/wallpaper/${wall.src})`, // Уточняем путь к img
      }}
    ></div>
  );
};

export default Background; 