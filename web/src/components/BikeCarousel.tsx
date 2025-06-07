import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';



interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface BikeCarouselProps {
  autoPlayInterval?: number;
  className?: string;
}

export default function BikeCarousel({ 
  autoPlayInterval = 4000, 
  className = '' 
}: BikeCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const slides: Slide[] = [
    {
      id: 1,
      image: '/carousel/mtb.jpg',
      title: 'Mountain Bikes',
      subtitle: 'Conquiste qualquer desafio',
      description: 'Para ciclistas que buscam adrenalina e desafios'
    },
    {
      id: 2,
      image: '/carousel/speed.jpg',
      title: 'Speed Bikes',
      subtitle: 'Velocidade máxima',
      description: 'Aerodinâmica perfeita para competições e treinos'
    },
    {
      id: 3,
      image: '/carousel/urbanbike.jpg',
      title: 'Urban Bikes',
      subtitle: 'Estilo urbano',
      description: 'Mobilidade sustentável para o dia a dia na cidade'
    },
    {
      id: 4,
      image: '/carousel/eletrica.jpg',
      title: 'E-Bikes',
      subtitle: 'O futuro chegou',
      description: 'Tecnologia elétrica para ir mais longe com menos esforço'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev: number) => (prev + 1) % slides.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length, autoPlayInterval]);

  const nextSlide = (): void => {
    setCurrentSlide((prev: number) => (prev + 1) % slides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev: number) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = (): void => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className={`relative w-full h-96 sm:h-[500px] lg:h-[600px] bg-gray-900  overflow-hidden shadow-2xl ${className}`}>
      {/* Main Carousel Container */}
      <div className="relative w-full h-full">
        {/* Slides */}
        <div 
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-shrink-0 w-full h-full"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${slide.image})`
                }}
              />
              
              {/* Slide Content */}
              <div className="relative z-10 flex items-center justify-center h-full px-8 sm:px-12 lg:px-16">
                <div className="text-center text-white max-w-2xl">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 transform transition-all duration-700 delay-100">
                    {slide.title}
                  </h2>
                  <p className="text-xl sm:text-2xl lg:text-3xl mb-4 text-cyan-300 font-semibold transform transition-all duration-700 delay-200">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed transform transition-all duration-700 delay-300">
                    {slide.description}
                  </p>
                  
                  {/* CTA Button */}
                  <button className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 transform delay-400">
                    Comprar
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-cyan-400 w-8 shadow-lg shadow-cyan-400/50'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className="ml-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide Counter
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {currentSlide + 1} / {slides.length}
      </div> */}


    </div>
  );
}