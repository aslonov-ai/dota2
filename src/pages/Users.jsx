import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../components/Headers";

function Users() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/topPlayers")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.log("Api ishlamadi:", error);
      });
  }, []);

  return (
    <div className="bg-[#212121] h-full">
      <div className="mb-20">
        <Headers />
      </div>
      <div className="grid lg:grid-cols-4 gap-8 md:grid-cols-2 lg:max-w-7xl md:max-w-2xl mx-auto p-4">
        {players.map((player, index) => (
          <div class="relative rounded-2xl border border-yellow-500/70 bg-gradient-to-br from-amber-900/90 via-slate-900 to-emerald-900/90 hover:shadow-[0_0_40px_rgba(250,204,21,0.35)] p-4 max-w-sm mx-auto overflow-hidden">
            <div class="absolute -right-10 top-6 rotate-45 bg-yellow-500 text-black text-xs font-bold tracking-wide px-10 py-1 shadow-lg">
              TOP PLAYERS
            </div>

            <div class="flex items-center justify-between mb-3">
              <p class="text-lg font-extrabold tracking-wide uppercase text-amber-100">
                {player.personaname}
              </p>
            </div>

            <div class="flex justify-center relative  mb-4">
              <img
                onClick={() => {
                  localStorage.setItem("playerId", JSON.stringify(player.account_id));
                  navigate("/userinfos");
                }}
                className="rounded-full border-3 border-amber-400/60 w-40"
                src={player.avatarfull}
              />
            </div>

            <div class="flex items-center justify-between mb-3 text-sm">
              <div class="flex gap-3">
                <div class="flex items-center gap-1">
                  <span class="text-xs uppercase text-amber-200/80">
                    rating
                  </span>
                  <span class="px-2 py-0.5 rounded bg-slate-900/70 border border-amber-500/70 text-amber-200 font-semibold">
                    {player.rating ? player.rating : "-"}
                  </span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="text-xs uppercase text-amber-200/80">
                    rank_tier
                  </span>
                  <span class="px-2 py-0.5 rounded bg-slate-900/70 border border-emerald-500/70 text-emerald-200 font-semibold">
                    {player.rank_tier ? player.rank_tier : "-"}
                  </span>
                </div>
              </div>
            </div>

            <div class="space-y-2 text-xs leading-relaxed">
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">
                  account_id<i class=" fa-solid fa-angles-right fa-xs"></i>
                </span>
                {player.account_id}
              </div>
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">
                  computed_mmr<i class="fa-solid fa-angles-right fa-xs"></i>
                </span>
                {player.computed_mmr}
              </div>
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">
                  delta<i class="fa-solid fa-angles-right fa-xs"></i>
                </span>
                {player.delta}
              </div>
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">
                  steamid<i class="fa-solid fa-angles-right fa-xs"></i>
                </span>
                {player.steamid}
              </div>
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">
                  full_history_time
                  <i class="fa-solid fa-angles-right fa-xs"></i>
                </span>
                {player.full_history_time}
              </div>
            </div>

            <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
