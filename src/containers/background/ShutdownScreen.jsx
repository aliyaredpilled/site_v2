import React, { useState, useEffect } from 'react';
import './shutdown.scss';

const ShutdownScreen = () => {
  const shutdownText = "Завершение работы... Рекомендуем включить в наушниках lo-fi и направиться в ближайшее кафе за горячим напитком.";
  const imageUrl = "/img/ui/shutdown.svg"; // Обновленный путь

  const [showSpinner, setShowSpinner] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
      setShowContent(true);
    }, 5000); // Показываем спиннер 5 секунд

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []); // Пустой массив зависимостей, чтобы эффект выполнился один раз

  return (
    <div className="shutdown-screen">
      {showSpinner && <div className="shutdown-spinner"></div>}
      {showContent && (
        <div className="shutdown-content">
          <img src={imageUrl} alt="Shutting down..." className="shutdown-image bobbing" />
          <p className="shutdown-text">{shutdownText}</p>
        </div>
      )}
    </div>
  );
};

export default ShutdownScreen; 