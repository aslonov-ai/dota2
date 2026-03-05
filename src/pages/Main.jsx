// Main.jsx
import React, { useEffect, useRef } from 'react';
import { video } from 'framer-motion/client';

const heroes = [
  'antimage',
  'axe',
  'bane',
  'bloodseeker',
  'crystal_maiden',
  'drow_ranger',
  'earthshaker',
  'juggernaut',
  'mirana',
  'pudge',
  'shadow_fiend',
  'sniper',
  'storm_spirit',
  'sven',
  'tiny',
  'vengefulspirit',
  'windrunner',
  'zeus',
  'invoker',
  'phantom_assassin',
];

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return ref;
};

const Background = () => {
  const bgHeroes = heroes.slice(0, 12);
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-20 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4 rotate-12 scale-110">
        {bgHeroes.map((hero) => (
          <img
            key={hero}
            src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4`}
            alt={hero}
            className="w-full h-auto object-cover opacity-30 grayscale"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

const cardsData = [
  {
    id: 1,
    title: 'The International 2024',
    image:
      "https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_webm.webm",
  },
  {
    id: 2,
    title: 'New Hero: Ringmaster',
    image:
      'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/ringmaster.png',
  },
  {
    id: 3,
    title: 'Crownfall Act IV',
    image:
      'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/events/crownfall/act4_social.jpg',
  },
];

const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 max-w-6xl mx-auto">
      {cardsData.map((card) => (
        <div
          key={card.id}
          className="group relative bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="relative h-48 md:h-56 overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-white text-xl font-bold">{card.title}</h3>
            <p className="text-gray-400 text-sm mt-1">Watch highlights →</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video fon */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/heroes_panorama_1080p.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/40"></div>

      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 text-white">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/logo.png"
            alt="Dota 2"
            className="h-10"
          />
          <span className="text-2xl font-bold tracking-wider">DOTA 2</span>
        </div>
        <nav className="hidden md:flex gap-8 text-lg">
          <a href="#" className="hover:text-red-400 transition">
            Game
          </a>
          <a href="#" className="hover:text-red-400 transition">
            Heroes
          </a>
          <a href="#" className="hover:text-red-400 transition">
            News
          </a>
          <a href="#" className="hover:text-red-400 transition">
            Esports
          </a>
        </nav>
        <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition">
          Play Free
        </button>
      </header>

      {/* Cards (pastki qism) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-10 px-4">
        <Cards />
      </div>
    </div>
  );
};

const TextSection = () => {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  return (
    <section className="py-32 px-4 text-white max-w-4xl mx-auto">
      <div ref={ref1} className="reveal mb-24">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
          The Battle Begins
        </h2>
        <p className="text-xl text-gray-300 leading-relaxed">
          Dota 2 is a multiplayer online battle arena (MOBA) game where two
          teams of five players compete to destroy the enemy's Ancient. With
          over 120 heroes, each match is a unique strategic experience.
        </p>
      </div>

      <div ref={ref2} className="reveal mb-24">
        <h2 className="text-4xl font-bold mb-4 text-red-400">
          Choose Your Hero
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          From powerful mages to agile assassins, every hero offers a distinct
          playstyle. Master your favorite or adapt to the ever‑changing meta.
        </p>
      </div>

      <div ref={ref3} className="reveal">
        <h2 className="text-4xl font-bold mb-4 text-red-400">
          Join the Community
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Millions of players worldwide. Watch tournaments, follow pros, and
          become part of the biggest esports scene on the planet.
        </p>
      </div>
    </section>
  );
};

const Carousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 900;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        HERO GALLERY
      </h2>
      <div className="relative max-w-7xl mx-auto">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          ←
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          →
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {heroes.map((hero) => (
            <div
              key={hero}
              className="flex-shrink-0 w-48 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700 hover:border-red-500 transition group"
            >
              <img
                src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero}.png`}
                alt={hero}
                className="w-full h-40 object-contain group-hover:scale-105 transition duration-300"
              />
              <p className="text-center text-white mt-3 font-semibold capitalize">
                {hero.replace('_', ' ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Main = () => {
  return (
    <>
      <Background />
      <main className="relative z-10">
        <Hero />
        <TextSection />
        <Carousel />
        <div className="h-32"></div> {/* Scroll uchun qo'shimcha bo'sh joy */}
      </main>
    </>
  );
};

export default Main;