import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Headers from "../components/Headers";

function Teams() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => { 
        console.log("Api ishlamadi:", error);
      });
  }, []);
  return (
    <div className="bg-black">
      <div className="mb-20">
        <Headers/>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 md:max-w-2xl gap-6 lg:max-w-7xl mx-auto">
        {teams.map((team, index) => (
          <div className="lg:w-100 md:w-80 w-70 relative rounded-2xl border border-yellow-500/70 bg-gradient-to-br from-amber-900/90 via-slate-900 to-emerald-900/90 hover:shadow-[0_0_40px_rgba(250,204,21,0.35)] p-4 max-w-sm mx-auto overflow-hidden">
            <div class="absolute -right-10 top-6 rotate-45 bg-yellow-500 text-black text-xs font-bold tracking-wide px-10 py-1 shadow-lg">
              Teams
            </div>

            <div class="flex items-center justify-between mb-3">
              <p class="text-lg font-extrabold tracking-wide uppercase text-amber-100">
               {team.name}
              </p>
            </div>

            <div class="relative h-40 mb-4 rounded-xl bg-gradient-to-tr from-slate-900 via-emerald-900 to-amber-700 overflow-hidden border border-amber-400/60 shadow-inner">
              <div class="flex justify-center absolute inset-x-4 bottom-2 text-[0.65rem] text-amber-100/80 font-semibold uppercase tracking-[0.2em] text-right">
                <img className="h-35 w-35 rounded-full" src={team.logo_url} />
              </div>
            </div>

            <div class="flex items-center justify-between mb-3 text-sm">
              <div class="flex gap-3">
                <div class="flex items-center gap-1">
                  <span class="text-xs uppercase text-amber-200/80">
                    wins
                  </span>
                  <span class="px-2 py-0.5 rounded bg-slate-900/70 border border-amber-500/70 text-amber-200 font-semibold">
                    {team.wins}
                  </span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="text-xs uppercase text-amber-200/80">
                    losses
                  </span>
                  <span class="px-2 py-0.5 rounded bg-slate-900/70 border border-emerald-500/70 text-emerald-200 font-semibold">
                    {team.losses}
                  </span>
                </div>
              </div>
            </div>

            <div class="space-y-2 text-xs leading-relaxed">
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">
                  tag:
                </span>
               {team.tag}
              </div>
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">
                  delta:
                </span>
               {team.delta}
              </div>
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">last_match_time:</span>
               {team.last_match_time}
              </div>
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">match_id:</span>
               {team.match_id}
              </div>
              <div class="text-gray-300">
                <span class="font-bold text-amber-300">team_id:</span>
               {team.team_id}
              </div>
            </div>

            <div class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
