import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import rasm from "../../public/images/image.png";

const gameLinks = [
  { label: "Overview", href: "/game" },
  { label: "New Players", href: "/new-players" },
  { label: "Gameplay", href: "/gameplay" },
  { label: "Items", href: "/items" },
];

const languages = ["English", "Русский", "O'zbek"];

const Headers = () => {
  const [gameOpen, setGameOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navClass = ({ isActive }) =>
    ` flex items-center h-14 px-4 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 ${
      isActive
        ? "text-blue-500"
        : "text-[#8eacc5] hover:text-white hover:bg-white/5"
    }`;

  return (
    <div>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-24 px-5 gap-0"
        style={{
          background: "#000000",
          borderBottom: "1px solid #1e3a5a",
          boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}
      >
        <Link to="/Main" className=" w-80">
          <img src={rasm} alt="Dota 2" />
        </Link>

        <nav className="flex items-center justify-end text-white flex-1">
          <div
            className="relative"
            onMouseEnter={() => setGameOpen(true)}
            onMouseLeave={() => setGameOpen(false)}
          >
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

          <NavLink to="/Main" className={navClass}>
            Main
          </NavLink>

          <NavLink to="/Teams" className={navClass}>
            Teams
          </NavLink>

          <NavLink to="/Matches" className={navClass}>
            Matches
          </NavLink>

          <NavLink to="/Leagues" className={navClass}>
            Schema
          </NavLink>

          <NavLink to="/heros" className={navClass}>
            Heroes
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 ml-auto flex-shrink-0">
          <NavLink to="/Users" className={navClass}>
            Players
          </NavLink>

          <NavLink to="/live" className={navClass}>
            Live
          </NavLink>

          <div
            className="relative hidden md:block"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6a8fa8] hover:text-white px-2.5 py-2 transition-colors duration-200 cursor-pointer">
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

          <a
          type="https://store.steampowered.com/app/570/Dota_2/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-2.5 h-10 px-5 rounded-sm text-[13px] font-black uppercase tracking-wide text-white transition-all duration-200 flex-shrink-0"
            style={{
              background: "linear-gradient(180deg, #4c9be8 0%, #1a6fbd 100%)",
              boxShadow: "0 0 12px rgba(76,155,232,0.3)",
            }}
          >
            Play for free
          </a>
        </div>
      </header>

      <div className="h-14" />
    </div>
  );
};

export default Headers;
