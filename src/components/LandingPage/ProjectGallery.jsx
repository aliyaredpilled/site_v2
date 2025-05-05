import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import icons

// Генерируем массив путей к изображениям в public
// Список файлов получен из папки /Users/aliya/Downloads/Telegram Desktop/win11React 3/tomson-toy-craft/src/assets/projects
// Обновляем порядок в соответствии с последним предоставленным списком
const imageNames = [
  'gf63gfgg2.jpg', 'dfs32ss32.jpg', 'dfds53gas2.jpg', 'f74ghd2.jpg', '43gsskstrl.jpg', 
  'fsdjgh5gja4.jpg', 'jshd5asajhr.jpg', '567dgh23.jpg', 'dghjgas5aa3.jpg', 'fsd7fsafs.jpg', 
  'dsfjhi3e623.jpg', 'dfsjhjsd576.jpg', 'fghjd43fd.jpg', 'dfs43rws.jpg', 'ghjsdo3.jpg', 
  'gdru643ff23.jpg', 'fgdgd7fdgd.jpg', 'dsf3r2fewd.jpg', 'ffg3454gf432.jpg', 'dfdsgf4gh1.jpg', 
  'dfsfgl8.jpg', 'vdsjhjkl2.jpg', 'gfghf567rf.jpg', '45646ddss.jpg', 'fds456hjsdx4.jpg', 
  'dkznq91.jpg', 'neui42cx.jpg', 'sdkewn3n2.jpg', 'nwxdkfn2n.jpg', 'dhsbbb3b2b.jpg', 
  'fsef3v422d.jpg', 'dshgweg32vgh.jpg', 'fjugg53hgghf2.jpg', 'fsjg3j21.jpg', 'fsdf231dsdf.jpg', 
  'fsafr3fdsr3t4.jpg', 'eref76thgh332.jpg', 'fdsbh32nj1.jpg', 'fdsjbf4332rnf.jpg', 'vcsd6klilks.jpg', 
  'dsd32bn2aq.jpg', 'fdshgj12gh2.jpg'
];
// Update path to load images from the public directory
const projectImages = imageNames.map(name => `/img/projects/${name}`);

// --- Конфигурация Embla ---
const OPTIONS = {
  loop: true,
  draggable: true,
  align: 'center', // Убрали 'as const'
  slidesToScroll: 1,
};
const IMG_WIDTH = '115%'; // Ширина слайда

// --- Компонент слайда ---
const CarouselSlide = ({ imgSrc, index }) => {
  return (
    <div 
      className="relative h-full shrink-0 grow-0 basis-auto" // Используем классы вместо инлайн-стиля для flex
      style={{ flexBasis: IMG_WIDTH }} // Оставим flex-basis в стиле
    >
      <img
        className="block w-full h-full object-contain rounded-md"
        src={imgSrc}
        alt={`Проект ${index + 1}`}
      />
    </div>
  );
};

// --- Основной компонент галереи ---
const ProjectGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const lastWheelTime = React.useRef(0); // Ref to store the timestamp of the last wheel event
  const WHEEL_DEBOUNCE_TIME = 250; // Debounce time in milliseconds (Increased from 100)

  // State for button enabled/disabled status
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  // Scroll handlers
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Wheel scroll handler (existing)
  const handleWheelScroll = useCallback((event) => {
    if (!emblaApi) return;
    const currentTime = Date.now();
    if (currentTime - lastWheelTime.current < WHEEL_DEBOUNCE_TIME) return;
    const deltaX = event.deltaX;
    if (Math.abs(deltaX) > Math.abs(event.deltaY)) {
      event.preventDefault(); // <-- Раскомментировано
      lastWheelTime.current = currentTime;
      if (deltaX > 0) scrollNext(); else scrollPrev();
    }
  }, [emblaApi, scrollPrev, scrollNext]); // Added dependencies

  // Update button states when the carousel settles or initializes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // Set initial state
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); // Re-check on re-init
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    }; // Cleanup
  }, [emblaApi, onSelect]);

  return (
    <div className="relative py-4">
      <div 
        className="overflow-hidden cursor-grab active:cursor-grabbing" 
        ref={emblaRef}
        onWheel={handleWheelScroll} // Add wheel event handler
      >
        {/* Уменьшаем высоту контейнера слайдов до h-[24rem] */}
        <div className="flex items-center h-[24rem] gap-6"> 
          {projectImages.map((img, index) => (
            <CarouselSlide
              key={index}
              index={index}
              imgSrc={img}
            />
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        className="absolute top-1/2 left-32 transform -translate-y-1/2 z-10 p-2 bg-white/70 hover:bg-white rounded-full shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
        onClick={scrollPrev}
        disabled={prevBtnDisabled} // Since loop is true, this will likely always be false
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      {/* Next Button */}
      <button
        className="absolute top-1/2 right-32 transform -translate-y-1/2 z-10 p-2 bg-white/70 hover:bg-white rounded-full shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
        onClick={scrollNext}
        disabled={nextBtnDisabled} // Since loop is true, this will likely always be false
        aria-label="Следующий слайд"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
};

export default ProjectGallery; 