import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../components/Headers";

function Users() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const cardsRef = useRef([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/topPlayers")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.log("Api ishlamadi:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <svg
            fill="hsl(228, 97%, 42%)"
            viewBox="0 0 24 24"
            className="w-20 h-20 animate-spin"
          >
            <circle cx="12" cy="12" r="10" stroke="none" />
          </svg>
        </div>
      ) : (
        <div>
          <Headers />

          <div className="my-20 flex justify-center gap-4">
            <Link
              to={"/proplayers"}
              className="relative group overflow-hidden border-2 border-[#ffaa33] p-3 px-6 text-white font-bold rounded-lg bg-gradient-to-r from-[#2a3a4a] to-[#1a2a3a] hover:scale-105 transition-all"
            >
              ⚔️ Pro Players
            </Link>

            <button className="relative group overflow-hidden border-2 border-[#88ccff] p-3 px-6 text-white font-bold rounded-lg bg-gradient-to-r from-[#1a2a3a] to-[#0f1a24] hover:scale-105 transition-all">
              🛡️ Top Players
            </button>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:max-w-7xl md:max-w-4xl mx-auto p-4">
            {players.map((player, index) => (
              <div
                key={player.account_id}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="relative bg-gradient-to-br from-[#1b003f]/80 via-[#3f006f]/80 to-[#120036]/80 rounded-3xl border border-violet-700/40 shadow-lg transition-transform duration-200 overflow-hidden cursor-pointer hover:scale-105"
              >
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
                    className="rounded-full border-4 border-amber-400/60 w-36 shadow-lg hover:scale-105 transition"
                    src={player.avatarfull}
                  />
                </div>

                <div className="px-4 pb-4 text-xs text-gray-300 space-y-1">
                  <p>
                    <span className="font-bold text-amber-300">
                      account_id:
                    </span>{" "}
                    {player.account_id}
                  </p>
                  <p>
                    <span className="font-bold text-amber-300">
                      computed_mmr:
                    </span>{" "}
                    {player.computed_mmr}
                  </p>
                  <p>
                    <span className="font-bold text-amber-300">delta:</span>{" "}
                    {player.delta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
