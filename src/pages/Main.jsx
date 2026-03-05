import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import video from "../../public/images/dota_montage_02.mp4";


const API_BASE_URL = "https://your-api.com/api";   // ← API URL shu yerga

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


const ENDPOINTS = {
  heroes:  "/heroes",      
  news:    "/news",        
  stats:   "/stats",       
};


const FALLBACK_HEROES = [
  "antimage","axe","bane","bloodseeker","crystal_maiden",
  "drow_ranger","earthshaker","juggernaut","mirana","pudge",
  "sniper","storm_spirit","sven","tiny",
  "vengefulspirit","windrunner","invoker","phantom_assassin",
].map(name => ({
  id: name,
  name: name.replace(/_/g, " "),
  image_url: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${name}.png`,
  role: "Hero",
}));

const FALLBACK_NEWS = [
  {
    id: 1,
    tag: "PATCH NOTES",
    title: "The International",
    desc: "Watch highlights →",
    image_url: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/bg-augment.jpg",
    video_url: "https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4",
  },
  {
    id: 2,
    tag: "ESPORTS",
    title: "Epic Gameplay",
    desc: "Watch highlights →",
    image_url: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/ti/ti10/bg_promo_ti.jpg",
    video_url: "https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4",
  },
  {
    id: 3,
    tag: "NEW HERO",
    title: "Best Moments",
    desc: "Watch highlights →",
    image_url: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/social/social_05.jpg",
    video_url: "https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4",
  },
];

const FALLBACK_STATS = [
  { label: "Monthly Players", value: "13M+", icon: "◈" },
  { label: "Unique Heroes",   value: "124+", icon: "⚔" },
  { label: "Prize Pool",      value: "$40M+",icon: "◉" },
  { label: "Countries",       value: "180+", icon: "◎" },
];

const useScrollReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          entry.target.classList.add("opacity-100", "translate-y-0");
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
};


const Cards = ({ cards }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 max-w-6xl mx-auto">
      {cards.map((card) => (
        <div
          key={card.id}
          className="group relative bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 transition transform hover:-translate-y-2"
        >
          <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
            {card.video_url ? (
              <video autoPlay loop muted className="w-full h-full object-cover">
                <source src={card.video_url} type="video/mp4" />
              </video>
            ) : (
              <img src={card.image_url} alt={card.title} className="w-full h-full object-cover" />
            )}

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="w-16 h-16 rounded-full  flex items-center justify-center text-white text-2xl">
                
              </div>
            </div>

            {card.tag && (
              <span className="absolute top-3 left-3 text-xs font-bold tracking-widest uppercase bg-red-600 text-white px-2 py-1">
                {card.tag}
              </span>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-white text-xl font-bold">{card.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{card.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};



const Hero = ({ news }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={video} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-6 text-white">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/logo.png"
            className="h-10"
            alt="dota2"
          />
          <span className="text-2xl font-bold tracking-wider">DOTA 2</span>
        </div>

        <nav className="hidden md:flex gap-8 text-lg">
          <a href="/Main"  className="hover:text-red-400">Game</a>
          <a href="/Users" className="hover:text-red-400">Heroes</a>
          <a href="#"      className="hover:text-red-400">News</a>
          <a href="#"      className="hover:text-red-400">Esports</a>
        </nav>

        <button className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700">
          Play Free
        </button>
      </header>

      <div className="relative z-20 flex items-center h-full text-white px-4">
        <div>
          <h1 className="text-6xl md:text-7xl font-bold mb-44">
            «Современный <br /> многопользовательский <br /> шедевр»
          </h1>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 pb-0 px-4">
        <Cards cards={news} />
      </div>
    </section>
  );
};


const StatsSection = ({ stats }) => {
  const ref = useScrollReveal();
  return (
    <section className="py-20 px-4 bg-gray-950">
      <div
        ref={ref}
        className="opacity-0 translate-y-10 transition duration-700 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
      >
        {stats.map((s, i) => (
          <div key={i} className="border border-gray-700 rounded-xl p-6 hover:border-red-500 transition">
            <div className="text-red-500 text-3xl mb-2">{s.icon}</div>
            <div className="text-4xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-gray-400 text-sm tracking-widest uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};



const TextSection = () => {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  return (
    <section className="py-32 px-4 text-white max-w-4xl mx-auto">
      <div ref={ref1} className="opacity-0 translate-y-10 transition duration-700 mb-24">
        <h2 className="text-5xl font-bold mb-6 text-red-500 lg:text-center">The Battle Begins</h2>
        <p className="text-xl text-gray-300 lg:text-center">
          Two teams of five players battle to destroy the enemy Ancient.
        </p>
      </div>

      <div className="lg:flex justify-between">
        <div ref={ref2} className="opacity-0 translate-y-10 transition duration-700 mb-24">
          <h2 className="text-4xl font-bold mb-4 text-red-400">Choose Your Hero</h2>
          <p className="text-lg text-gray-300">Every hero has unique skills and abilities.</p>
        </div>

        <div ref={ref3} className="opacity-0 translate-y-10 transition duration-700">
          <h2 className="text-4xl font-bold mb-4 text-red-400">Join the Community</h2>
          <p className="text-lg text-gray-300">Millions of players around the world play every day.</p>
        </div>
      </div>
    </section>
  );
};

const Carousel = ({ heroes }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -800 : 800,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-12">HERO GALLERY</h2>

      <div className="relative max-w-7xl mx-auto">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-red-600 transition"
        >
          ←
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-red-600 transition"
        >
          →
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-4 scroll-smooth scrollbar-hide px-8"
        >
          {heroes.map((hero) => (
            <div
              key={hero.id}
              className="flex-shrink-0 w-48 bg-gray-800/60 rounded-2xl p-4 border border-gray-700 hover:border-red-500 transition"
            >
              <img
                src={hero.image_url}
                alt={hero.name}
                className="w-full h-40 object-contain"
              />
              <p className="text-center text-white mt-3 capitalize">{hero.name}</p>
              {hero.role && (
                <p className="text-center text-gray-400 text-xs mt-1 capitalize">{hero.role}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white text-lg tracking-widest">Loading...</p>
    </div>
  </div>
);



const Main = () => {
  const [heroes, setHeroes]   = useState([]);
  const [news,   setNews]     = useState([]);
  const [stats,  setStats]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
       
        const [heroesRes, newsRes, statsRes] = await Promise.allSettled([
          api.get(ENDPOINTS.heroes),   
          api.get(ENDPOINTS.news),               api.get(ENDPOINTS.stats),            ]);
       
        setHeroes(
          heroesRes.status === "fulfilled"
            ? heroesRes.value.data
            : FALLBACK_HEROES
        );

        setNews(
          newsRes.status === "fulfilled"
            ? newsRes.value.data
            : FALLBACK_NEWS
        );

        setStats(
          statsRes.status === "fulfilled"
            ? statsRes.value.data
            : FALLBACK_STATS
        );

      } catch (err) {
        
        console.error("API Error:", err);
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
        <div className="bg-yellow-900/80 text-yellow-300 text-center py-2 px-4 text-sm tracking-wide fixed top-0 left-0 right-0 z-50">
          ⚠ API unavailable — showing demo data. ({error})
        </div>
      )}

      <Hero news={news} />

      <StatsSection stats={stats} />

      <TextSection />

      <Carousel heroes={heroes} />

      <div className="h-32" />
    </main>
  );
};

export default Main;