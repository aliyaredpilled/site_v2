import React from 'react';
import ProjectGallery from './ProjectGallery'; // Импортируем нашу галерею
import { motion } from 'framer-motion';

// Анимация появления (та же, что и в AboutSection)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const ProjectsSection = () => {
  return (
    <section 
      id="projects" // ID для навигации
      // Уменьшаем вертикальные padding: py-16 -> py-12, md:py-24 -> md:py-16
      className="py-12 md:py-16 bg-microsoft-white text-microsoft-gray-900"
    >
      {/* Меняем max-w-[1400px] на max-w-7xl и px-8 на px-4 у внешнего контейнера */} 
      <div className="mx-auto relative z-10 px-4 max-w-5xl"> 
        {/* Заголовок секции */} 
        <motion.div 
          className="text-center mb-2 md:mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          {/* Возвращаем оригинальные классы */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-microsoft-blue"> {/* Сделаем bold как в About */} 
            Наши Проекты
          </h2>
          {/* Возвращаем оригинальный класс */}
          <p className="text-base md:text-lg text-microsoft-gray-700 max-w-2xl mx-auto">
             Посмотрите нашу галерею лучших проектов и узнайте, как мы помогаем брендам создавать незабываемые впечатления с помощью уникальных игрушек.
          </p>
        </motion.div>

        {/* Контейнер для галереи */} 
        <div className="max-w-5xl mx-auto mb-8"> {/* Changed max-w-7xl to max-w-5xl */}
           <ProjectGallery />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 