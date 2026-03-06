import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../components/Headers";

function Users() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/topPlayers")
      .then((response) => setPlayers(response.data))
      .catch((error) => console.log("Api ishlamadi:", error));
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;

    const glow = card.querySelector(".glow");
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15), transparent 60%)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    const glow = card.querySelector(".glow");
    glow.style.background =
      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%)";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a001f] via-[#120036] to-[#020010]">
      <div className="mb-20">
        <Headers />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:max-w-7xl md:max-w-4xl mx-auto p-4 z-10 relative">
        {players.map((player, index) => (
          <div
            key={player.account_id}
            ref={(el) => (cardsRef.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className="relative bg-gradient-to-br from-[#1b003f]/80 via-[#3f006f]/80 to-[#120036]/80 rounded-3xl border border-violet-700/40 shadow-[0_0_50px_rgba(139,92,246,0.3),0_15px_40px_rgba(0,0,0,0.5)] transition-transform duration-200 overflow-hidden cursor-pointer hover:scale-105"
          >
            <div className="glow absolute inset-0 rounded-3xl transition-all duration-200 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>

            <div className="absolute -right-10 top-6 rotate-45 bg-yellow-500 text-black text-xs font-bold tracking-wide px-10 py-1 shadow-lg">
              TOP PLAYERS
            </div>

            <div className="flex items-center justify-between p-4 mb-2">
              <p className="text-lg font-extrabold tracking-wide uppercase text-amber-100">
                {player.personaname}
              </p>
            </div>

            <div className="flex justify-center relative mb-4">
              <img
                onClick={() => {
                  localStorage.setItem(
                    "playerId",
                    JSON.stringify(player.account_id),
                  );
                  navigate("/userinfos");
                }}
                className="rounded-full border-4 border-amber-400/60 w-36 shadow-lg transition-transform duration-200 hover:scale-105"
                src={player.avatarfull}
              />
            </div>

            <div className="flex items-center justify-between px-4 mb-3 text-sm">
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-xs uppercase text-amber-200/80">
                    rating
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900/70 border border-amber-500/70 text-amber-200 font-semibold">
                    {player.rating ? player.rating : "-"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs uppercase text-emerald-200/80">
                    rank_tier
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900/70 border border-emerald-500/70 text-emerald-200 font-semibold">
                    {player.rank_tier ? player.rank_tier : "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4 space-y-1 text-xs text-gray-300">
              <p>
                <span className="font-bold text-amber-300">account_id: </span>
                {player.account_id}
              </p>
              <p>
                <span className="font-bold text-amber-300">computed_mmr: </span>
                {player.computed_mmr}
              </p>
              <p>
                <span className="font-bold text-amber-300">delta: </span>
                {player.delta}
              </p>
              <p>
                <span className="font-bold text-amber-300">steamid: </span>
                {player.steamid}
              </p>
              <p>
                <span className="font-bold text-amber-300">
                  full_history_time:{" "}
                </span>
                {player.full_history_time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
