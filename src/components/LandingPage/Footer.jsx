import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { scrollToSectionWithOffset } from "../../utils/scrollUtils";

// Путь к логотипу из public
const topsonLogoPng = '/img/landing/topson ru black00.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    scrollToSectionWithOffset(targetId.substring(1));
  };

  // Общие классы — чтобы легко переиспользовать и поддерживать
  const linkClass =
    'block text-sm text-microsoft-gray-500 hover:text-microsoft-blue hover:underline transition-colors';
  const sectionTitleClass =
    'text-sm font-semibold text-microsoft-gray-900 mb-4 uppercase tracking-wider';
  const iconClass = 'w-4 h-4 text-microsoft-gray-500 flex-shrink-0';

  return (
    <footer className="bg-microsoft-gray-100 text-microsoft-gray-700 pt-8 pb-4">
      <div className="mx-auto max-w-5xl px-4">
        {/* --- Верхняя сетка --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Лого и описание */}
          <div>
            <img src={topsonLogoPng} alt="Tomson" className="h-20 mb-4" loading="lazy" />
            <p className="text-sm text-microsoft-gray-500">
              Превращаем идеи в игрушки, которые повышают лояльность вашего бренда.
            </p>
          </div>

          {/* Навигация */}
          <nav>
            <h4 className={sectionTitleClass}>Навигация</h4>
            <ul className="space-y-2">
              <li>
                <a onClick={(e) => handleNavClick(e, '#about')} className={linkClass}>
                  О нас
                </a>
              </li>
              <li>
                <a onClick={(e) => handleNavClick(e, '#projects')} className={linkClass}>
                  Проекты
                </a>
              </li>
              <li>
                <a onClick={(e) => handleNavClick(e, '#contact')} className={linkClass}>
                  Контакты
                </a>
              </li>
            </ul>
          </nav>

          {/* Контакты */}
          <div>
            <h4 className={sectionTitleClass}>Контакты</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className={iconClass} />
                <a
                  href="mailto:info@topson.ru"
                  className={linkClass.replace('block', '')}
                >
                  info@topson.ru
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className={iconClass} />
                <a href="tel:+79161282999" className={linkClass.replace('block', '')}>
                  +7 916 128 29 99
                </a>
              </li>
            </ul>
          </div>

          {/* Филиалы */}
          <div>
            <h4 className={sectionTitleClass}>Адрес</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className={iconClass} />
                <div>
                  <p className="text-sm text-microsoft-gray-500 whitespace-nowrap">
                    г. Москва, Сущевский вал, 49,
                  </p>
                  <p className="text-sm text-microsoft-gray-500 whitespace-nowrap">
                    Бизнес-центр Jazz
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Нижняя полоса --- */}
        <div className="border-t border-microsoft-gray-200 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-microsoft-gray-500">
          <p>© {currentYear} Topson. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
