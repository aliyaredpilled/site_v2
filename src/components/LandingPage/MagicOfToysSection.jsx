import React from 'react';
import { motion } from 'framer-motion';
import { scrollToSectionWithOffset } from '../../utils/scrollUtils';

// Изображения из public
const imgDesign = '/img/landing/image_2.png';
const imgFactory = '/img/landing/pic3.png';

// Анимация появления
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

/**
 * Секция «Как рождаются игрушки?»
 * Изображения на десктопе остаются в пределах вьюпорта благодаря `sticky`,
 * поэтому пользователь всегда видит их целиком, пока читает текст.
 */
const MagicOfToysSection = () => {
  return (
    <section
      id="magic"
      className="py-12 md:py-16 bg-microsoft-white text-microsoft-gray-900"
    >
      <div className="mx-auto max-w-5xl px-4 relative z-10">
        {/* ---------- Заголовок ---------- */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-microsoft-blue">
            Как рождаются игрушки?
          </h2>
          <p className="text-base md:text-lg text-microsoft-gray-700 max-w-2xl mx-auto">
            Мы отточили каждый этап создания игрушек, чтобы гарантировать
            превосходное качество и идеальное воплощение вашего бренда.
          </p>
        </motion.div>

        {/* ---------- Этап 1 ---------- */}
        <motion.div
          className="grid md:grid-cols-12 gap-x-8 gap-y-10 items-start mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
        >
          {/* Текст */}
          <div className="md:col-span-6 order-2 md:order-1">
            <h3 className="text-2xl font-bold text-microsoft-blue mb-6">
              От идеи к дизайну
            </h3>
            <ul className="space-y-4 text-microsoft-gray-700 list-disc list-inside font-medium text-lg leading-relaxed">
              <li>
                <strong className="font-semibold">Концепция:</strong> обсуждаем вашу
                идею, цели и аудиторию.
              </li>
              <li>
                <strong className="font-semibold">Скетчи:</strong> дизайнеры создают
                эскизы для визуализации.
              </li>
              <li>
                <strong className="font-semibold">3D‑моделирование:</strong> создаём
                детальную трёхмерную модель.
              </li>
              <li>
                <strong className="font-semibold">Прототипирование:</strong>
                изготавливаем физический прототип для оценки.
              </li>
            </ul>
          </div>

          {/* Картинка — «липнет» к верху экрана при скролле */}
          <div className="md:col-span-6 order-1 md:order-2 md:sticky md:top-24">
            <img
              src={imgDesign}
              alt="От идеи к дизайну"
              className="w-full max-h-[70vh] object-contain rounded-xl shadow-md"
            />
          </div>
        </motion.div>

        {/* ---------- Этап 2 ---------- */}
        <motion.div
          className="grid md:grid-cols-12 gap-x-8 gap-y-10 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
        >
          {/* Картинка слева */}
          <div className="md:col-span-6 md:sticky md:top-24">
            <img
              src={imgFactory}
              alt="Производство и контроль качества"
              className="w-full max-h-[70vh] object-contain rounded-xl shadow-md"
            />
          </div>

          {/* Текст */}
          <div className="md:col-span-6">
            <h3 className="text-2xl font-bold text-microsoft-blue mb-6">
              Производство и контроль качества
            </h3>
            <ul className="space-y-4 text-microsoft-gray-700 list-disc list-inside font-medium text-lg leading-relaxed">
              <li>
                <strong className="font-semibold">Подготовка:</strong> разрабатываем
                спецификации и формы.
              </li>
              <li>
                <strong className="font-semibold">Производство:</strong> запускаем
                серийное изготовление.
              </li>
              <li>
                <strong className="font-semibold">Контроль качества:</strong> проводим
                многоступенчатую проверку.
              </li>
              <li>
                <strong className="font-semibold">Логистика:</strong> организуем
                доставку по всему миру.
              </li>
            </ul>
          </div>
        </motion.div>

        {/* ---------- CTA ---------- */}
        <motion.div
          className="text-center mt-20 md:mt-24 py-12 bg-microsoft-gray-100 rounded-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInVariants}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-microsoft-blue mb-4">
            Готовы создать уникальную игрушку для вашего бренда?
          </h3>
          <p className="text-base md:text-lg text-microsoft-gray-700 max-w-xl mx-auto mb-8 font-medium">
            Мы поможем воплотить вашу идею в реальность, создав игрушку, которая
            станет идеальным амбассадором вашего бренда.
          </p>
          <motion.a
            onClick={() => scrollToSectionWithOffset('contact')}
            className="inline-flex items-center px-8 py-3 bg-microsoft-blue text-microsoft-white rounded hover:bg-microsoft-dark-blue transition-colors font-medium cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Обсудить проект
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default MagicOfToysSection;
