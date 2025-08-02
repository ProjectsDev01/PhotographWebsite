import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef(null);
  
  // Przykładowe zdjęcia - w rzeczywistości będą pobierane z API
  const photos = [
    { id: 1, title: "Portret w plenerze", category: "Portrety" },
    { id: 2, title: "Zachód słońca nad morzem", category: "Krajobrazy" },
    { id: 3, title: "Ujęcie z lotu ptaka", category: "Aerial" },
    { id: 4, title: "Reportaż ślubny", category: "Eventy" },
  ];
  
  // Automatyczne przewijanie karuzeli
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev === photos.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, photos.length]);

  // Przewijanie do konkretnego slajdu
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  // Nawigacja klawiszami
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide === 0 ? photos.length - 1 : currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlide === photos.length - 1 ? 0 : currentSlide + 1);
      } else if (e.key === ' ') {
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isPlaying, photos.length]);

  return (
    <div className="min-h-screen">
      {/* Sekcja hero z karuzelą */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          ref={carouselRef}
          className="absolute inset-0 transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="flex h-full w-full">
            {photos.map((photo, index) => (
              <div 
                key={photo.id} 
                className="flex-shrink-0 w-full h-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                {/* Placeholder dla zdjęcia */}
                <div className="w-full h-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 inline-block">
                      <span className="text-sm font-semibold text-white/80 tracking-widest">
                        {photo.category.toUpperCase()}
                      </span>
                      <h2 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-6">
                        {photo.title}
                      </h2>
                      <Link 
                        to="/albums" 
                        className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1"
                      >
                        Zobacz więcej prac
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nawigacja karuzeli */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Przejdź do slajdu ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-8 right-8 bg-black/30 text-white p-3 rounded-full backdrop-blur-sm hover:bg-black/50 transition"
          aria-label={isPlaying ? "Zatrzymaj pokaz slajdów" : "Odtwórz pokaz slajdów"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        {/* Przewiń w dół */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Sekcja ofertowa */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-widest text-indigo-600">USŁUGI FOTOGRAFICZNE</span>
            <h2 className="text-4xl font-bold mt-4 mb-6">Moja specjalizacja</h2>
            <p className="text-xl text-gray-600">
              Tworzę unikalne obrazy, które opowiadają historie i zatrzymują czas. Każda sesja to nowe wyzwanie i możliwość stworzenia czegoś wyjątkowego.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Fotografia Ślubna", icon: "💍", desc: "Reportaże pełne emocji i naturalnych ujęć" },
              { title: "Portrety", icon: "👤", desc: "Artystyczne portrety indywidualne i rodzinne" },
              { title: "Produktowa", icon: "📦", desc: "Profesjonalne zdjęcia produktów dla biznesu" },
              { title: "Komercyjna", icon: "🏢", desc: "Fotografia dla marek i kampanii reklamowych" },
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <Link 
                  to="/about" 
                  className="text-indigo-600 font-semibold flex items-center hover:text-indigo-800 transition"
                >
                  Dowiedz się więcej
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja statystyk */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10+", label: "Lat doświadczenia" },
              { value: "500+", label: "Zrealizowanych sesji" },
              { value: "50k+", label: "Wykonanych zdjęć" },
              { value: "99%", label: "Zadowolonych klientów" },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-5xl font-bold text-indigo-400 mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja procesu pracy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-widest text-indigo-600">JAK PRACUJĘ</span>
            <h2 className="text-4xl font-bold mt-4 mb-6">Mój proces twórczy</h2>
            <p className="text-xl text-gray-600">
              Każdy projekt traktuję indywidualnie, dbając o każdy szczegół i spełnienie Twoich oczekiwań.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Konsultacja", desc: "Omawiamy Twoje potrzeby i koncepcję sesji" },
                { step: "2", title: "Przygotowania", desc: "Planujemy lokalizację, stylizację i harmonogram" },
                { step: "3", title: "Realizacja", desc: "Przeprowadzamy sesję w przyjaznej atmosferze" },
                { step: "4", title: "Edycja i dostawa", desc: "Wyselekcjonowane i obrobione zdjęcia dostarczam w wybranym formacie" },
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-100 relative"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Gotowy na wyjątkowe zdjęcia?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Skontaktuj się ze mną, aby omówić szczegóły Twojej sesji. Stworzę dla Ciebie unikalne zdjęcia, które zachowają wspomnienia na lata.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Umów sesję
            </Link>
            <Link 
              to="/albums" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition duration-300"
            >
              Zobacz portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}