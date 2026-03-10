import axios from "axios";
import { useEffect, useState } from "react";

function TeamsInfo() {
  const [teams, setTeams] = useState();
  const [matches, setMatches] = useState([]);
  const [show, setShow] = useState(false);
  let teamId = JSON.parse(localStorage.getItem("teamId"));
  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/teams/ " + teamId)
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.log("Api ishlamadi:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/teams/ " + teamId + "/matches")
      .then((response) => {
        setMatches(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Api ishlamadi:", error);
      });
  }, []);
  return (
    <div className="bg-gradient-to-br from-amber-600/100 via-slate-900 to-emerald-900/90  h-screen py-30">
      <div>
        {teams && (
          <div className="max-w-3xl mx-auto relative rounded-2xl border-3 border-yellow-500/70 bg-gradient-to-br from-amber-900/100 via-slate-900 to-emerald-900/90 hover:shadow-[0_0_40px_rgba(250,204,21,0.35)] p-4 overflow-hidden">
            <div class="flex items-center justify-between mb-3">
              <p class="text-lg font-extrabold tracking-wide uppercase text-amber-100">
                {teams.name}
              </p>
            </div>
            <div class="relative h-40 mb-4 rounded-xl bg-gradient-to-tr from-slate-900 via-emerald-900 to-amber-700 overflow-hidden border border-amber-400/60 shadow-inner">
              <div class="flex justify-center absolute inset-x-4 bottom-2 text-[0.65rem] text-amber-100/80 font-semibold uppercase tracking-[0.2em] text-right">
                <img className="h-35 w-35" src={teams.logo_url} />
              </div>
            </div>

            <div class="flex mb-4 text-sm ">
              <div class="flex gap-5">
                <div class="flex items-center gap-1">
                  <span class="text-xs uppercase text-amber-200/80">wins</span>
                  <span class="px-2 py-0.5 rounded bg-slate-900/70 border border-amber-500/70 text-amber-200 font-semibold">
                    {teams.wins}
                  </span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="text-xs uppercase text-amber-200/80">
                    losses
                  </span>
                  <span class="px-2 py-0.5 rounded bg-slate-900/70 border border-emerald-500/70 text-emerald-200 font-semibold">
                    {teams.losses}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-around">
              <div class="space-y-2 text-xs leading-relaxed">
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">delta:</span>
                  {teams.delta}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">last_match_time:</span>
                  {teams.last_match_time}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">tag:</span>
                  {teams.tag}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">match_id:</span>
                  {teams.match_id}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">team_id:</span>
                  {teams.team_id}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">rating:</span>
                  {teams.rating}
                </div>
              </div>

              <div class="space-y-2 text-xs leading-relaxed">
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">delta:</span>
                  {teams.delta}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">last_match_time:</span>
                  {teams.last_match_time}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">tag:</span>
                  {teams.tag}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">match_id:</span>
                  {teams.match_id}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">team_id:</span>
                  {teams.team_id}
                </div>
                <div class="text-gray-300">
                  <span class="font-bold text-amber-300">rating:</span>
                  {teams.rating}
                </div>
              </div>
            </div>

            <button className="border-2 font-bold border-amber-400/60 rounded-xl p-2 bg-gradient-to-tr from-slate-900 via-emerald-900 to-amber-700 text-white">
              Matches
            </button>

            <div class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        )}
      </div>
      {show && (
        <div>
          {matches.map((match, index) => (
            <div className=" border-4">
              <p>{match.match_id}</p>
              <p>{match.cluster}</p>
              <p>{match.dire_score}</p>
              <p>{match.league_name}</p>
              <p>{match.leagueid}</p>
              <p>{match.opposing_team_id}</p>
              <p>{match.radiant_score}</p>
              <p>{match.start_time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamsInfo;
