import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Иконка стрелки вверх

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Показываем кнопку, когда пользователь прокрутил вниз на 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Плавно прокручиваем страницу наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-4 rounded-full bg-[#4378B7]/75 text-white shadow-lg hover:bg-[#4378B7] hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#4378B7] focus:ring-opacity-50 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 1000, visibility: isVisible ? 'visible' : 'hidden' }} // zIndex чтобы кнопка была поверх всего
      aria-label="Вернуться наверх"
    >
      <FaArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton; 