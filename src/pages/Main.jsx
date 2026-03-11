import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import video from "../../public/images/dota_montage_02.mp4";
import Headers from "../components/Headers";

const API_BASE_URL = "https://your-api.com/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    // "Content-Type": "application/json",
  },
});

const ENDPOINTS = {
  heroes: "/heroes",
  news:   "/news",
  stats:  "/stats",
};

const HERO_NAMES = [
  "antimage","axe","bane","bloodseeker","crystal_maiden",
  "drow_ranger","earthshaker","juggernaut","mirana","pudge",
  "sniper","storm_spirit","sven","tiny","vengefulspirit",
  "windrunner","invoker","phantom_assassin","nevermore","skeleton_king",
  "ursa","faceless_void","witch_doctor","bristleback","tidehunter",
  "dragon_knight","lina","lion","zuus","terrorblade",
];

const FALLBACK_HEROES = HERO_NAMES.map((name) => ({
  id:        name,
  name:      name.replace(/_/g, " "),
  image_url: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${name}.png`,
  role:      "Hero",
}));

const FALLBACK_NEWS = [
  {
    id: 1, tag: "PATCH NOTES", title: "The International",
    desc: "Watch highlights →",
    image_url: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/bg-augment.jpg",
    video_url: "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/muerta/muerta_the_calling.mp4",
  },
  {
    id: 2, tag: "ESPORTS", title: "Epic Gameplay",
    desc: "Watch highlights →",
    image_url: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/ti/ti10/bg_promo_ti.jpg",
    video_url: "https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4",
  },
  {
    id: 3, tag: "NEW HERO", title: "Best Moments",
    desc: "Watch highlights →",
    image_url: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/social/social_05.jpg",
    video_url: "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/viper/viper_viper_strike.mp4",
  },
];

const FALLBACK_STATS = [
  { label: "Monthly Players", value: "13M+", icon: "◈" },
  { label: "Unique Heroes",   value: "124+", icon: "⚔"  },
  { label: "Prize Pool",      value: "$40M+",icon: "◉"  },
  { label: "Countries",       value: "180+", icon: "◎"  },
];

const SLIDESHOW_IMAGES = [
  { src: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png`,   label: "The International 2019" },
  { src: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/invoker.png`,   label: "The International 10"   },
  { src: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_assassin.png`, label: "New Frontier" },
  { src: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png`,  label: "Hero Spotlight" },
];

const MEDIA_GALLERY = [
  { type:"video", src:"https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/juggernaut/juggernaut_omni_slash.mp4", poster:"https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/bg-augment.jpg", title:"Epic Montage", tag:"VIDEO" },
  { type:"video", src:"https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/tidehunter/tidehunter_ravage.mp4", poster:"https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/bg-augment.jpg", title:"Epic Montage", tag:"VIDEO" },
  { type:"video", src:"https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4", poster:"https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/bg-augment.jpg", title:"Epic Montage", tag:"VIDEO" },
  { type:"video", src:"https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/witch_doctor/witch_doctor_death_ward.mp4", poster:"https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/ti/ti10/bg_promo_ti.jpg", title:"Team Fights", tag:"GAMEPLAY" },
  { type:"video", src:"https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4", poster:"https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/bg-augment.jpg", title:"Epic Montage", tag:"VIDEO" },
  { type:"video", src:"https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4", poster:"https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/bg-augment.jpg", title:"New Season", tag:"VIDEO" },
];

const useScrollReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("opacity-100","translate-y-0"); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const AutoSlideshow = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 700);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  return (
    <section className="relative w-full overflow-hidden bg-black mt-10" style={{ height: "clamp(300px, 70vh, 800px)" }}>
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : 1 }}
        >
          <img
            src={img.src}
            alt={img.label}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.6) saturate(1.3)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

          {/* Label - Responsive */}
          <div
            className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-4 sm:left-6 md:left-10 right-4 sm:right-auto"
            style={{ opacity: i === current ? 1 : 0, transition: "opacity .5s ease .3s" }}
          >
            <p className="text-red-500 text-[10px] sm:text-xs tracking-[3px] sm:tracking-[6px] uppercase mb-1 sm:mb-2 font-bold">— Dota 2</p>
            <h2 className="text-white font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              {img.label}
            </h2>
          </div>
        </div>
      ))}

      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-4 sm:left-6 md:left-10 z-10 flex gap-2 sm:gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); startTimer(); }}
            className="transition-all duration-300"
            style={{
              width: i === current ? (window.innerWidth < 640 ? 20 : 28) : (window.innerWidth < 640 ? 6 : 8),
              height: window.innerWidth < 640 ? 6 : 8,
              background: i === current ? "#dc2626" : "rgba(255,255,255,0.3)",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10">
        <div
          key={current}
          style={{ height:"100%", background:"#dc2626", animation:"progress4s 4s linear forwards" }}
        />
      </div>

      <style>{`@keyframes progress4s { from{width:0%} to{width:100%} }`}</style>
    </section>
  );
};

const MediaGallery = ({ items }) => {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const pauseRef = useRef(false);
  const rafRef = useRef(null);

  const tripled = [...items, ...items, ...items];

  useEffect(() => {
    const SPEED = 0.6;
    const animate = () => {
      const track = trackRef.current;
      if (track && !pauseRef.current) {
        posRef.current += SPEED;
        const oneThird = track.scrollWidth / 3;
        if (posRef.current >= oneThird) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-950 overflow-hidden">
      <div className="px-4 mb-6 sm:mb-8 md:mb-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
        <div>
          <p className="text-red-500 text-[10px] sm:text-xs tracking-[3px] sm:tracking-[5px] uppercase mb-1 sm:mb-2">— Gallery</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase">Videos & Art</h2>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">Hover to pause</p>
      </div>

      <div
        className="flex gap-3 sm:gap-4 md:gap-5"
        style={{ width: "max-content" }}
        ref={trackRef}
        onMouseEnter={() => { pauseRef.current = true; }}
        onMouseLeave={() => { pauseRef.current = false; }}
      >
        {tripled.map((item, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 group"
            style={{ 
              width: window.innerWidth < 640 ? 240 : window.innerWidth < 768 ? 280 : 320,
              height: window.innerWidth < 640 ? 150 : window.innerWidth < 768 ? 175 : 200,
              transition: "border-color .3s, box-shadow .3s",
            }}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                autoPlay muted loop playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ filter: "brightness(0.7) saturate(1.2)" }}
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ filter: "brightness(0.7) saturate(1.2)" }}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-xs font-bold tracking-wider bg-red-600">
              {item.tag}
            </span>

            <p className="absolute bottom-2 left-2 sm:bottom-3 sm:left-4 text-white font-bold text-xs sm:text-sm line-clamp-1">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Cards = ({ cards }) => (
  <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto px-4">
    {cards.map((card) => (
      <div key={card.id}
        className="group relative bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 transition transform hover:-translate-y-2 overflow-hidden w-full md:w-1/3"
      >
        <div className="relative h-40 lg:block md:block hidden sm:h-44 md:h-48 lg:h-56">
          {card.video_url ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src={card.video_url} type="video/mp4" />
            </video>
          ) : (
            <img src={card.image_url} alt={card.title} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition" />
          {card.tag && (
            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-red-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1">
              {card.tag}
            </span>
          )}
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="text-white text-base sm:text-lg md:text-xl font-bold line-clamp-1">{card.title}</h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-1">{card.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const HeroSection = ({ news }) => (
  <section className="relative h-screen w-full overflow-hidden">
    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
      <source src={video} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/50" />

    {/* Responsive Header */}
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3 sm:p-4 md:p-6 text-white">
      <div className="flex items-center gap-1 sm:gap-2">
        <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/logo.png" className="h-6 sm:h-8 md:h-10" alt="dota2" />
      </div>
      <nav className=" md:flex gap-4 lg:gap-8 text-sm lg:text-lg">
        <Headers/>
      </nav>
      {/* Mobile menu button - can be added later */}
      {/* <button className="md:hidden text-white p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button> */}
    </header>

    <div className="relative z-20 flex items-center h-full text-white px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 sm:mb-16 md:mb-24 lg:mb-32 xl:mb-44">
        «Современный <br className="hidden sm:block" /> многопользовательский <br className="hidden sm:block" /> шедевр»
      </h1>
    </div>

    <div className="absolute bottom-0 left-0 right-0 pb-0 px-2 sm:px-3 md:px-4">
      <Cards cards={news} />
    </div>
  </section>
);

const StatsSection = ({ stats }) => {
  const ref = useScrollReveal();
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-950">
      <div ref={ref} className="opacity-0 translate-y-10 transition duration-700 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto text-center">
        {stats.map((s, i) => (
          <div key={i} className="border border-gray-700 rounded-xl p-4 sm:p-5 md:p-6 hover:border-red-500 transition">
            <div className="text-red-500 text-2xl sm:text-3xl mb-1 sm:mb-2">{s.icon}</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TextSection = () => {
  const r1 = useScrollReveal(), r2 = useScrollReveal(), r3 = useScrollReveal();
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 text-white max-w-4xl mx-auto">
      <div ref={r1} className="opacity-0 translate-y-10 transition duration-700 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-red-500 text-center">The Battle Begins</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center px-2">Two teams of five players battle to destroy the enemy Ancient.</p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        <div ref={r2} className="opacity-0 translate-y-10 transition duration-700 text-center lg:text-left flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-red-400">Choose Your Hero</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">Every hero has unique skills and abilities.</p>
        </div>
        <div ref={r3} className="opacity-0 translate-y-10 transition duration-700 text-center lg:text-left flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-red-400">Join the Community</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">Millions of players around the world play every day.</p>
        </div>
      </div>
    </section>
  );
};

const Carousel = ({ heroes }) => {
  const scrollRef = useRef(null);
  const timerRef = useRef(null);
  const pauseRef = useRef(false);
  const [cardWidth, setCardWidth] = useState(160);

  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth < 640) setCardWidth(140);
      else if (window.innerWidth < 768) setCardWidth(160);
      else if (window.innerWidth < 1024) setCardWidth(180);
      else setCardWidth(208);
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const startAuto = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el || pauseRef.current) return;
      el.scrollLeft += cardWidth;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) el.scrollLeft = 0;
    }, 1800);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, [cardWidth]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ 
      left: dir === "left" ? -cardWidth * (window.innerWidth < 640 ? 2 : 3) : cardWidth * (window.innerWidth < 640 ? 2 : 3), 
      behavior: "smooth" 
    });
  };

  const looped = [...heroes, ...heroes, ...heroes];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-900">
      <p className="text-red-500 text-[10px] sm:text-xs tracking-[3px] sm:tracking-[5px] uppercase mb-2 text-center">— The Roster</p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-white mb-8 sm:mb-10 md:mb-12 uppercase px-2">Hero Gallery</h2>

      <div className="relative max-w-7xl mx-auto">
        <button onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full transition text-sm sm:text-base">
          ←
        </button>
        <button onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full transition text-sm sm:text-base">
          →
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scroll-smooth px-6 sm:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => { pauseRef.current = true; }}
          onMouseLeave={() => { pauseRef.current = false; }}
        >
          {looped.map((hero, i) => (
            <div key={`${hero.id}-${i}`}
              className="flex-shrink-0 bg-gray-800/70 rounded-2xl p-3 sm:p-4 border border-gray-700 hover:border-red-500 hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              style={{ width: window.innerWidth < 640 ? 140 : window.innerWidth < 768 ? 160 : window.innerWidth < 1024 ? 180 : 208 }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={hero.image_url} alt={hero.name}
                  className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ filter: "brightness(0.8) saturate(1.2)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <p className="text-center text-white mt-2 sm:mt-3 capitalize font-semibold text-xs sm:text-sm line-clamp-1">{hero.name}</p>
              {hero.role && <p className="text-center text-gray-400 text-[10px] sm:text-xs mt-1 capitalize">{hero.role}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-center px-4">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white text-base sm:text-lg tracking-widest">Loading...</p>
    </div>
  </div>
);

const Main = () => {
  const [heroes, setHeroes] = useState([]);
  const [news, setNews] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [heroesRes, newsRes, statsRes] = await Promise.allSettled([
          api.get(ENDPOINTS.heroes),
          api.get(ENDPOINTS.news),
          api.get(ENDPOINTS.stats),
        ]);
        setHeroes(heroesRes.status === "fulfilled" ? heroesRes.value.data : FALLBACK_HEROES);
        setNews(newsRes.status === "fulfilled" ? newsRes.value.data : FALLBACK_NEWS);
        setStats(statsRes.status === "fulfilled" ? statsRes.value.data : FALLBACK_STATS);
      } catch (err) {
        setError(err.message);
        setHeroes(FALLBACK_HEROES);
        setNews(FALLBACK_NEWS);
        setStats(FALLBACK_STATS);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="bg-gray-900">
      {error && (
        <div className="bg-yellow-900/80 text-yellow-300 text-center py-1.5 sm:py-2 px-3 sm:px-4 text-[10px] sm:text-sm tracking-wide fixed top-0 left-0 right-0 z-50">
          ⚠ API unavailable — showing demo data. ({error})
        </div>
      )}

      <HeroSection news={news} />

      <StatsSection stats={stats} />

      <TextSection />

      <AutoSlideshow images={SLIDESHOW_IMAGES} />

      <MediaGallery items={MEDIA_GALLERY} />

      <Carousel heroes={heroes} />

      <div className="h-16 sm:h-20 md:h-24 lg:h-32" />
    </main>
  );
};

export default Main;