import React from 'react';

const PartnersSection = () => {
  return (
    <section id="partners" className="pt-16 pb-2 bg-white">
      <div className="container mx-auto px-3">
        <div className="text-center mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-microsoft-blue">Наши партнеры</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-0">
            Мы гордимся сотрудничеством с ведущими компаниями, которые доверяют нам свои проекты.
          </p>
        </div>
        
        <div className="flex justify-center -mt-14">
          <div className="max-w-3xl">
            <img 
              src="/img/landing/Логотипы_компаний_с_кем_работали.jpg" 
              alt="Логотипы компаний-партнеров" 
              className="w-full"
              style={{ 
                clipPath: "inset(20% 0 20% 0)",
                transform: "scale(1.15)",
                transformOrigin: "center center"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection; 