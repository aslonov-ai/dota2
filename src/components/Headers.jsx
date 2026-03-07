// import { Link } from "react-router-dom";
// function Headers() {
//   return (
//     <div>
//       <ul className="flex">
//         <Link to={"/users"}>Users</Link>
//         <Link to={"/main"}>Main</Link>
//       </ul>
//     </div>
//   );
// }

// export default Headers;





import React, { useState } from "react";
import { Link } from "react-router-dom";
import rasm from "../../public/images/image.png"

const gameLinks = [
  { label: "Overview",    href: "/game" },
  { label: "New Players", href: "/new-players" },
  { label: "Gameplay",    href: "/gameplay" },
  { label: "Items",       href: "/items" },
];

const languages = [
  "English", "Русский", "O'zbek", 
];

const Headers = () => {
  const [gameOpen, setGameOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-24 px-5 gap-0"
        style={{
          background: "linear-gradient(180deg, #0e1d2e 0%, #0a1520 100%)",
          borderBottom: "1px solid #1e3a5a",
          boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}
      >

        <Link to="/" className="flex items-center gap-2 mr-7 flex-shrink-0">
          <img
          src={rasm}
            alt="Dota 2"
            className=""
          />
          {/* <span className="text-xl font-black tracking-widest text-[#c8d6e5]">
            DOTA 2
          </span> */}
        </Link>

        {/* NAV */}
        <nav className="flex items-center justify-end text-white flex-1">

          {/* ИГРА dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGameOpen(true)}
            onMouseLeave={() => setGameOpen(false)}
          >
            {/* <button
              className={`flex items-center gap-1 h-14 px-4 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer
                ${gameOpen ? "text-white bg-white/5" : "text-[#8eacc5] hover:text-white hover:bg-white/5"}`}
            >
              Play
              <span className="text-[9px] opacity-60 mt-0.5">▼</span>
            </button> */}

            {gameOpen && (
              <div
                className="absolute top-14 left-0 min-w-[180px] py-1.5 z-50"
                style={{
                  background: "#0d1f30",
                  border: "1px solid #1e3a5a",
                  borderTop: "2px solid #4a8ab5",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                }}
              >
                {gameLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="block px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-[#8eacc5] hover:text-white hover:bg-[#4a8ab5]/20 transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
 <Link
            to="/Main"
            className="flex items-center h-14 px-4 text-[13px] font-bold uppercase tracking-wider text-[#8eacc5] hover:text-white hover:bg-white/5 transition-colors duration-200"
          >
            Main
          </Link>
          {/* ГЕРОИ */}
          <Link
            to="/Teams"
            className="flex items-center h-14 px-4 text-[13px] font-bold uppercase tracking-wider text-[#8eacc5] hover:text-white hover:bg-white/5 transition-colors duration-200"
          >
            Teams
          </Link>
           <Link
            to="/Leagues"
            className="flex items-center h-14 px-4 text-[13px] font-bold uppercase tracking-wider text-[#8eacc5] hover:text-white hover:bg-white/5 transition-colors duration-200"
          >
            Schema
          </Link>
           <Link
            to="/heros"
            className="flex items-center h-14 px-4 text-[13px] font-bold uppercase tracking-wider text-[#8eacc5] hover:text-white hover:bg-white/5 transition-colors duration-200"
          >
            Heroes
          </Link>
           <Link
            to="/matches"
            className="flex items-center h-14 px-4 text-[13px] font-bold uppercase tracking-wider text-[#8eacc5] hover:text-white hover:bg-white/5 transition-colors duration-200"
          >
            {/* Matches */}
          </Link>

          {/* НОВОСТИ */}
         

          {/* КИБЕРСПОРТ */}
          {/* <Link
            // to="/esports"
            className="flex items-center h-14 px-4 text-[13px] font-bold uppercase tracking-wider text-[#8eacc5] hover:text-white hover:bg-white/5 transition-colors duration-200"
          >
            eSports
          </Link> */}

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 ml-auto flex-shrink-0">

          {/* ВОЙТИ */}
          <a
            href={"/Users"}
            className="hidden md:block text-[12px] font-bold uppercase tracking-widest text-[#8eacc5] hover:text-white px-3 py-2 transition-colors duration-200"
          >
           Players
          </a>

          {/* ВОЙТИ */}
          <a
            href={"/live"}
            className="hidden md:block text-[12px] font-bold uppercase tracking-widest text-[#8eacc5] hover:text-white px-3 py-2 transition-colors duration-200"
          >
           Live
          </a>

          {/* ЯЗЫК */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6a8fa8] hover:text-white px-2.5 py-2 transition-colors duration-200 cursor-pointer">
              {/* Globe SVG */}
              <svg className="w-3.5 h-3.5 fill-current opacity-70" viewBox="0 0 24 24">
                {/* <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/> */}
              </svg>
              Select language
              <span className="text-[9px] opacity-60">▼</span>
            </button>

            {langOpen && (
              <div
                className="absolute top-9 right-0 min-w-[150px] py-1.5 z-50"
                style={{
                  background: "#0d1f30",
                  border: "1px solid #1e3a5a",
                  borderTop: "2px solid #4a8ab5",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLangOpen(false)}
                    className="block w-full text-left px-4 py-2 text-[12px] font-semibold text-[#8eacc5] hover:text-white hover:bg-[#4a8ab5]/20 transition-colors duration-150 cursor-pointer"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ИГРАТЬ БЕСПЛАТНО */}
          <a 
            // href="https://store.steampowered.com/app/570/Dota_2/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-2.5 h-10 px-5 rounded-sm text-[13px] font-black uppercase tracking-wide text-white transition-all duration-200 flex-shrink-0"
            style={{
              background: "linear-gradient(180deg, #4c9be8 0%, #1a6fbd 100%)",
              boxShadow: "0 0 12px rgba(76,155,232,0.3)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "linear-gradient(180deg, #5daaee 0%, #2280cc 100%)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(76,155,232,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "linear-gradient(180deg, #4c9be8 0%, #1a6fbd 100%)";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(76,155,232,0.3)";
            }}
          >
            {/* Steam SVG */}
            <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.524-4.524 4.524h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.718L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.455 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.662 0 3.015-1.35 3.015-3.015zm-5.273.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/>
            </svg>
            Play for free
          </a>

        </div>
      </header>

      {/* Spacer — header height */}
      <div className="h-14" />
    </>
  );
};

export default Headers;
