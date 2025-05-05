import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollToSectionWithOffset } from "../../utils/scrollUtils"; // Импортируем
// Используем относительный путь из папки public
const topsonLogoPng = '/img/landing/topson-logo.png'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault(); // Предотвращаем стандартный переход по href
    scrollToSectionWithOffset(targetId.substring(1)); // Убираем # из ID
    // Закрыть мобильное меню, если оно открыто
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const navLinks = [
    { href: "#about", label: "О нас" },
    { href: "#projects", label: "Проекты" },
    { href: "#partners", label: "Партнеры" },
    { href: "#contact", label: "Контакты" },
  ];

  return (
    <motion.header 
      // Возвращаем пользовательские цвета Tailwind
      className={`sticky top-0 z-50 transition-all duration-300 bg-microsoft-white border-b border-microsoft-gray-200`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Убираем container-custom, т.к. у нас нет такого класса. Можно добавить max-w-7xl если нужно ограничить ширину */}
      <div className="mx-auto flex items-center justify-between h-16 px-4 max-w-5xl"> {/* Changed max-w-7xl to max-w-5xl */}
        <div className="flex items-center space-x-8">
          {/* Удаленный блок с логотипом был здесь */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                // href={link.href} // Убираем href для предотвращения стандартного поведения
                onClick={(e) => handleNavClick(e, link.href)} // Используем общий обработчик
                // Возвращаем оригинальные классы + cursor-pointer
                className={`px-1 py-1 text-sm font-medium text-microsoft-gray-700 hover:text-microsoft-blue transition-colors cursor-pointer`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-4">
             {/* Убираем иконки поиска и входа, т.к. они могут быть не нужны */}
            {/* 
            <button aria-label="Поиск" className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button aria-label="Войти" className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button> 
            */}
          </div>

          <button 
            className="lg:hidden z-10 text-microsoft-gray-700 p-2" // Возвращаем оригинальный класс
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          // Возвращаем оригинальные классы
          <div className="absolute top-16 left-0 right-0 bg-microsoft-white border-b border-microsoft-gray-200 shadow-md lg:hidden p-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  // href={link.href} // Убираем href
                  // Возвращаем оригинальные классы + cursor-pointer
                  className={`block px-3 py-2 text-base font-medium text-microsoft-gray-700 hover:text-microsoft-blue transition-colors cursor-pointer`}
                  onClick={(e) => handleNavClick(e, link.href)} // Используем общий обработчик (закрывает меню)
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 