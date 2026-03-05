import React, { useEffect, useRef } from "react";
import video from "../../public/images/dota_montage_02.mp4";




const heroes = [
  "antimage","axe","bane","bloodseeker","crystal_maiden",
  "drow_ranger","earthshaker","juggernaut","mirana","pudge",
  "sniper","storm_spirit","sven","tiny",
  "vengefulspirit","windrunner","invoker","phantom_assassin","drow_ranger","crystal_maiden","phantom_assassin","bloodseeker",
  ,"tiny",
];


// SCROLL REVEAL HOOK
const useScrollReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100","translate-y-0");
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return ref;
};


const cardsData = [
  {
    id:1,
    title:"The International",
    video:"https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4"
  },
  {
    id:2,
    title:"Epic Gameplay",
    video:"https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4"
  },
  {
    id:3,
    title:"Best Moments",
    video:"https://cdn.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4"
  }
];


// CARDS COMPONENT
const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 max-w-6xl mx-auto">

      {cardsData.map((card)=>(
        <div
          key={card.id}
          className="group relative bg-gray-900/80 backdrop-blur-sm rounded-2xl  shadow-2xl border border-gray-700 transition transform hover:-translate-y-2"
        >

          <div className="relative h-48 md:h-56">

            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            >
              <source src={card.video} type="video/mp4"/>
            </video>

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                
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



// HERO SECTION
const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4"/>
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>


      {/* HEADER */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-6 text-white">

        <div className="flex items-center gap-2">
          <img
            src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/logo.png"
            className="h-10"
          />
          <span className="text-2xl font-bold tracking-wider">
            DOTA 2
          </span>
        </div>

        <nav className="hidden md:flex gap-8 text-lg">
          <a href={"/Main"} className="hover:text-red-400">Game</a>
          <a href={"/Users"} className="hover:text-red-400">Heroes</a>
          <a href="#" className="hover:text-red-400">News</a>
          <a href="#" className="hover:text-red-400">Esports</a>
        </nav>

        <button className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700">
          Play Free
        </button>

      </header>


      {/* TEXT */}
      <div className="relative z-20 flex items-center  h-full  text-white px-4">

        <div>
          <h1 className="text-6xl md:text-7xl font-bold mb-44">
            «Современный <br /> многопользовательский <br /> шедевр»
          </h1>

          <p className="text-xl text-gray-300">
          </p>
        </div>

      </div><br /><br />


      <div className="absolute bottom-0 left-0 right-0 z-30 pb-0 mt-39 px-4">
        <Cards/>
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

      <div
        ref={ref1}
        className="opacity-0 translate-y-10 transition duration-700 mb-24"
      >
        <h2 className="text-5xl font-bold mb-6 text-red-500 lg:text-center">
          The Battle Begins
        </h2>

        <p className="text-xl text-gray-300 lg:text-center">
          Two teams of five players battle to destroy the enemy Ancient.
        </p>
      </div>

   <div className="lg:flex justify-between">
      <div
        ref={ref2}
        className="opacity-0 translate-y-10 transition duration-700 mb-24"
      >
        <h2 className="text-4xl font-bold mb-4 text-red-400">
          Choose Your Hero
        </h2>

        <p className="text-lg text-gray-300">
          Every hero has unique skills and abilities.
        </p>
      </div>


      <div
        ref={ref3}
        className="opacity-0 translate-y-10 transition duration-700"
      >
        <h2 className="text-4xl font-bold mb-4 text-red-400">
          Join the Community
        </h2>

        <p className="text-lg text-gray-300">
          Millions of players around the world play every day.
        </p>
      </div>
</div>
    </section>
  );
};



// HERO CAROUSEL
const Carousel = () => {

  const scrollRef = useRef(null);

  const scroll = (dir)=>{
    const scrollAmount = 800;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior:"smooth"
    });
  };

  return(

    <section className="py-20 px-4">

      <h2 className="text-4xl font-bold text-center text-white mb-12">
        HERO GALLERY
      </h2>

      <div className="relative max-w-7xl mx-auto">

        <button
          onClick={()=>scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
        >
          ←
        </button>

        <button
          onClick={()=>scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
        >
          →
        </button>


        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-4 scroll-smooth"
        >

          {heroes.map(hero=>(
            <div
              key={hero}
              className="flex-shrink-0  w-48 bg-gray-800/60 rounded-2xl p-4 border border-gray-700 hover:border-red-500 transition"
            >

              <img
                src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero}.png`}
                className="w-full h-40 object-contain"
              />

              <p className="text-center text-white mt-3 capitalize">
                {hero.replace("_"," ")}
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
    <main className="bg-gray-900">

      <Hero/>

      <TextSection/>

      <Carousel/>

      <div className="h-32"></div>

    </main>
  );
};

export default Main;