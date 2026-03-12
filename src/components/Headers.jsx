import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import rasm from "../../public/images/image.png";
import { Menu, X } from "lucide-react";

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
  const [mobileMenu, setMobileMenu] = useState(false);

  const navClass = ({ isActive }) =>
    `flex items-center h-14 px-4 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 ${
      isActive
        ? "text-blue-500"
        : "text-[#8eacc5] hover:text-white hover:bg-white/5"
    }`;

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-20 px-5 bg-black border-b border-[#1e3a5a]">

        {/* Logo */}
        <Link to="/Main" className="w-40">
          <img src={rasm} alt="logo" />
        </Link>

        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center text-white flex-1 justify-center">
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

          <NavLink to="/Users" className={navClass}>
            Players
          </NavLink>

          <NavLink to="/live" className={navClass}>
            Live
          </NavLink>
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">

          {/* Language */}
          <div
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button className="text-sm text-gray-400 hover:text-white">
              Language ▼
            </button>

            {langOpen && (
              <div className="absolute right-0 top-8 bg-[#0d1f30] border border-[#1e3a5a]">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Play button */}
          <a
            href="https://store.steampowered.com/app/570/Dota_2/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
          >
            Play for free
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden ml-auto text-white"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-black text-white flex flex-col items-center gap-4 py-6 z-40">

          <NavLink onClick={()=>setMobileMenu(false)} to="/Main">Main</NavLink>
          <NavLink onClick={()=>setMobileMenu(false)} to="/Teams">Teams</NavLink>
          <NavLink onClick={()=>setMobileMenu(false)} to="/Matches">Matches</NavLink>
          <NavLink onClick={()=>setMobileMenu(false)} to="/Leagues">Schema</NavLink>
          <NavLink onClick={()=>setMobileMenu(false)} to="/heros">Heroes</NavLink>
          <NavLink onClick={()=>setMobileMenu(false)} to="/Users">Players</NavLink>
          <NavLink onClick={()=>setMobileMenu(false)} to="/live">Live</NavLink>

          <a
            href="https://store.steampowered.com/app/570/Dota_2/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 rounded"
          >
            Play for free
          </a>
        </div>
      )}

      <div className="h-20" />
    </div>
  );
};

export default Headers;