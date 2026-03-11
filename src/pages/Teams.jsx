import React, { useState, useEffect } from "react";
import axios from "axios";
import Headers from "../components/Headers";
import { useNavigate } from "react-router-dom";

function Teams() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await axios.get("https://api.opendota.com/api/teams");
        setTeams(response.data.slice(0, 100));
      } catch (error) {
        console.log("Api ishlamadi:", error);
      } finally {
        setLoading(false);
      }
    };
    getTeams();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black bg-gradient-to-tr from-slate-900 via-emerald-900 to-amber-700">
      <div className="mb-16">
        <Headers />
      </div>
      <div className="flex justify-center mb-10">
        {/* <input
          type="text"
          placeholder="Search team..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 p-2 rounded-lg bg-slate-900 border border-yellow-500 text-white focus:outline-none focus:border-amber-400"
        /> */}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 md:max-w-2xl gap-6 lg:max-w-7xl mx-auto p-4">
          {filteredTeams.map((team) => (
            <div
              key={team.team_id}
              className="relative rounded-2xl lg:w-100 md:w-80 w-70 border border-yellow-500/70 bg-gradient-to-br from-amber-900/90 via-slate-900 to-emerald-900/90 hover:shadow-[0_0_40px_rgba(250,204,21,0.35)] p-4 max-w-sm mx-auto overflow-hidden"
            >
              <div className="absolute -right-10 top-6 rotate-45 bg-yellow-500 text-black text-xs font-bold tracking-wide px-10 py-1 shadow-lg">
                Teams
              </div>

              <div className="flex items-center justify-between mb-3">
                <p className="text-lg font-extrabold tracking-wide uppercase text-amber-100">
                  {team.name}
                </p>
              </div>

              <div
                onClick={() => {
                  localStorage.setItem("teamId", JSON.stringify(team.team_id));
                  navigate("/teamsinfo");
                }}
                className="relative h-40 mb-4 rounded-xl bg-gradient-to-tr from-slate-900 via-emerald-900 to-amber-700 overflow-hidden border border-amber-400/60 shadow-inner cursor-pointer flex items-center justify-center"
              >
                <img
                  className="h-32 w-32 rounded-full"
                  src={team.logo_url || "https://via.placeholder.com/120"}
                  alt={team.name}
                />
              </div>

              <div className="flex items-center justify-between mb-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs uppercase text-amber-200/80">
                      wins
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900/70 border border-amber-500/70 text-amber-200 font-semibold">
                      {team.wins}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-xs uppercase text-amber-200/80">
                      losses
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900/70 border border-emerald-500/70 text-emerald-200 font-semibold">
                      {team.losses}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">tag:</span>{" "}
                  {team.tag}
                </div>

                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">delta:</span>{" "}
                  {team.delta}
                </div>

                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">
                    last_match_time:
                  </span>{" "}
                  {team.last_match_time}
                </div>

                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">match_id:</span>{" "}
                  {team.match_id}
                </div>

                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">team_id:</span>{" "}
                  {team.team_id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;