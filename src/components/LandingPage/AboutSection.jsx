import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Factory,
  TrendingUp,
  BarChart3,
  Award,
  Briefcase,
  ToyBrick,
  Sparkles,
  Star,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               motion helpers                               */
/* -------------------------------------------------------------------------- */

// мягкий fade‑up
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// stagger для каскадного появления
const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// более спокойная анимация фоновых "блобов"
const blobAnimate = {
  animate: {
    scale: [1, 1.08, 1],
    rotate: [0, 8, 0],
    opacity: [0.55, 0.7, 0.55],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                  component                                 */
/* -------------------------------------------------------------------------- */

const AboutSection = () => {
  /* ---------------------------------- data --------------------------------- */
  const advantages = [
    {
      icon: <Factory size={26} className="text-white" />,
      title: "Собственное производство в Китае",
      description:
        "Гарантия оптимальных цен и полного контроля качества на всех этапах",
    },
    {
      icon: <TrendingUp size={26} className="text-white" />,
      title: "Полный цикл работ",
      description:
        "От идеи и дизайна до производства и доставки — мы берем на себя все заботы",
    },
    {
      icon: <Award size={26} className="text-white" />,
      title: "Качество и Безопасность",
      description:
        "Чистое производство, строгий контроль, сертификация, опыт с международными аудитами",
    },
    {
      icon: <Briefcase size={26} className="text-white" />,
      title: "Опыт с Топ‑Брендами",
      description:
        "Universal, Disney, Sony, Mattel, Hasbro и другие доверяют нам свои проекты",
    },
    {
      icon: <BarChart3 size={26} className="text-white" />,
      title: "Гибкость и Надежность",
      description:
        "Логистика от EXW до DDP, соответствие международным стандартам",
    },
    {
      icon: <Check size={26} className="text-white" />,
      title: "Представительства",
      description:
        "Москва, Гонконг — мы всегда на связи в вашем часовом поясе",
    },
  ];

  const services = [
    {
      title: "Игрушки для бизнеса",
      items: [
        "Промоакции",
        "Вложения в продукт",
        "Ритейл‑коллекции",
        "Игрушки с механизмами/электроникой",
      ],
      icon: <ToyBrick size={22} className="text-white" />,
    },
    {
      title: "Моментальная лояльность",
      items: [
        "Эмоциональная связь с брендом",
        "Уникальные коллекционные серии",
        "Игрушки с высокой воспринимаемой ценностью",
      ],
      icon: <Sparkles size={22} className="text-white" />,
    },
    {
      title: "Аналитика эффективности",
      items: [
        "Оценка результатов промо‑кампаний",
        "Данные для оптимизации",
        "Рекомендации по будущим проектам",
      ],
      icon: <Star size={22} className="text-white" />,
    },
  ];

  /* --------------------------------- render --------------------------------- */
  return (
    <section
      id="about"
      className="relative py-14 md:py-20 bg-microsoft-white text-microsoft-gray-900 overflow-hidden"
    >
      {/* decorative blob */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-microsoft-blue/20 blur-3xl"
        {...blobAnimate}
      />
      <motion.div
        className="absolute -bottom-16 right-10 w-56 h-56 rounded-full bg-microsoft-blue/10 blur-3xl"
        {...blobAnimate}
      />

      <div className="mx-auto max-w-5xl px-4 relative z-10">
        {/* heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-microsoft-blue">
            О нашей Мастерской Чудес
          </h2>
          <p className="text-base md:text-lg text-microsoft-gray-700 max-w-2xl mx-auto">
            Topson — это больше, чем просто производство. Мы создаём уникальные
            B2B‑решения, которые помогают брендам выделяться и завоёвывать
            лояльность.
          </p>
        </motion.div>

        {/* services */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14 md:mb-20"
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-microsoft-blue"
            variants={fadeUp}
          >
            Что мы делаем
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-x-6 gap-y-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -3, boxShadow: "0 6px 12px rgba(0,0,0,0.06)" }}
                className="group bg-microsoft-gray-100 p-8 rounded-2xl transition-transform duration-300 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-microsoft-blue text-microsoft-white mr-3 flex-shrink-0"
                  >
                    {React.cloneElement(service.icon, { size: 20 })}
                  </motion.div>
                  <h4 className="text-lg font-semibold text-microsoft-gray-900 leading-tight">
                    {service.title}
                  </h4>
                </div>

                <ul className="space-y-2 mb-1 text-base text-microsoft-gray-700 flex-grow leading-relaxed list-none pl-0">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <Check
                        size={12}
                        className="text-microsoft-blue mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* advantages */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-microsoft-blue"
            variants={fadeUp}
          >
            Наши Преимущества
          </motion.h3>

          {/* compact grid */}
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-10">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -3, boxShadow: "0 6px 12px rgba(0,0,0,0.06)" }}
                className="flex flex-col p-8 bg-microsoft-gray-100 rounded-2xl transition-transform duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-microsoft-blue text-microsoft-white flex-shrink-0"
                >
                  {React.cloneElement(advantage.icon, { size: 22 })}
                </motion.div>
                <h4 className="text-lg font-semibold text-microsoft-gray-900 mb-3 leading-tight">
                  {advantage.title}
                </h4>
                <p className="text-base text-microsoft-gray-700 flex-grow leading-snug">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
