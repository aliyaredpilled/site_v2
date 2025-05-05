import React from 'react';

const YandexMap = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-md">
      <div className="relative w-full h-full overflow-hidden">
        <div style={{position: "relative", overflow: "hidden", width: "100%", height: "100%"}}>
          <a 
            href="https://yandex.ru/maps/org/jazz/177623084178/?utm_medium=mapframe&utm_source=maps" 
            style={{color: "#eee", fontSize: "12px", position: "absolute", top: "0px", zIndex: 2}}
          >
            Topson
          </a>
          <a 
            href="https://yandex.ru/maps/213/moscow/category/business_center/184107509/?utm_medium=mapframe&utm_source=maps" 
            style={{color: "#eee", fontSize: "12px", position: "absolute", top: "14px", zIndex: 2}}
          >
            Офис Topson в Москве
          </a>
          <iframe 
            src="https://yandex.ru/map-widget/v1/org/jazz/177623084178/?ll=37.611396%2C55.793332&z=13" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            allowFullScreen={true} 
            style={{position: "relative", width: "100%", height: "100%", border: 0}}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default YandexMap; 