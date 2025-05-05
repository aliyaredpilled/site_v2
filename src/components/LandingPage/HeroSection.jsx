import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Используем относительный путь из папки public
const heroMainImage = '/img/landing/pic1.png';

// Анимация появления
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Анимация парения для картинки
const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    repeatType: "reverse", // Убрали 'as const', т.к. это TypeScript
    ease: "easeInOut"
  }
};

const HeroSection = () => {
  return (
    <section 
      id="hero" // Важно для навигации
      // Уменьшаем верхний padding: pt-20 -> pt-16, md:pt-28 -> md:pt-20
      className="relative overflow-hidden pt-16 md:pt-20 pb-4 md:pb-6 bg-microsoft-white"
    >
      {/* Меняем max-w-[1400px] на max-w-7xl и px-8 на px-4 */}
      <div className="relative mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Левая колонка: текст и кнопки */}
          <div className="md:col-span-3">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible" // Используем animate вместо whileInView для немедленной анимации
              // viewport={{ once: true }} // Убрали viewport, если анимация нужна сразу
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Возвращаем оригинальные классы */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight text-microsoft-gray-900 mt-12 max-w-2xl">
                <span className="block">Создаем Уникальные</span>
                <span className="block text-microsoft-blue">
                  Магические Игрушки
                </span>
              </h1>
            </motion.div>
            {/* Возвращаем оригинальный класс */}
            <motion.p 
              className="text-lg md:text-xl mb-8 text-microsoft-gray-700 max-w-xl"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.4 }} // Небольшая задержка для текста
            >
              Создаем яркие и запоминающиеся B2B-игрушки для промоакций, ритейла и 
              лицензионных коллекций, вызывающие вау-эффект у вашей аудитории.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.6 }} // Задержка для кнопок
            >
              {/* Кнопка 1 */}
              {/* Возвращаем оригинальные классы */}
              <a href="#about" className="group px-6 py-2 inline-flex items-center justify-center gap-2 bg-microsoft-blue text-microsoft-white rounded hover:bg-microsoft-dark-blue transition-colors font-medium">
                Узнать больше
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              {/* Кнопка 2 */}
              {/* Возвращаем оригинальные классы */}
              <a href="#projects" className="px-6 py-2 inline-flex items-center justify-center gap-2 bg-transparent text-microsoft-gray-900 border border-microsoft-gray-300 rounded hover:border-microsoft-gray-400 transition-colors font-medium">
                Посмотреть Проекты
              </a>
            </motion.div>
          </div>
          
          {/* Правая колонка: картинка */}
          <div className="md:col-span-2 hidden md:flex items-center justify-center relative">
            <motion.img 
              src={heroMainImage}
              alt="Иллюстрация игрушек"
              className="w-[30rem] h-72 lg:w-[40rem] lg:h-96 object-contain" // Размеры можно подстроить
              animate={floatAnimation}
              initial={{ y: 0 }} // Начальная позиция для анимации
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 