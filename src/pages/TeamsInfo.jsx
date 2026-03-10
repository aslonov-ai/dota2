import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TeamsInfo() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState();
  const [matches, setMatches] = useState([]);
  const [show, setShow] = useState(false);
  const [players, setPlayers] = useState();
  const [showplayer, setShowplayers] = useState(false);
  const [heros, setHeroes] = useState();
  const [showHeros, setShowHeroes] = useState(false);

  let teamId = JSON.parse(localStorage.getItem("teamId"));

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/teams/" + teamId)
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.log("Api ishlamadi:", error);
      });
  }, [teamId]);

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/teams/" + teamId + "/matches")
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.log("Api ishlamadi:", error);
      });
  }, [teamId]);

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/teams/" + teamId + "/players")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.log("Api ishlamadi:", error);
      });
  }, [teamId]);

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/teams/" + teamId + "/heroes")
      .then((response) => {
        setHeroes(response.data);
      })
      .catch((error) => {
        console.log("Api ishlamadi:", error);
      });
  }, [teamId]);

  return (
    <div className="bg-gradient-to-br from-amber-600/100 via-slate-900 to-emerald-900/90 min-h-screen py-30">
      <div>
        {teams && (
          <div className="max-w-3xl mx-auto relative rounded-2xl border-3 border-yellow-500/70 bg-gradient-to-br from-amber-900 via-slate-900 to-emerald-900/90 hover:shadow-[0_0_40px_rgba(250,204,21,0.35)] p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <p className="text-lg font-extrabold tracking-wide uppercase text-amber-100">
                {teams.name}
              </p>
            </div>

            <div className="relative h-40 mb-4 rounded-xl bg-gradient-to-tr from-slate-900 via-emerald-900 to-amber-700 overflow-hidden border border-amber-400/60 shadow-inner">
              <div className="flex justify-center absolute inset-x-4 bottom-2">
                <img className="h-35 w-35" src={teams.logo_url} alt="logo" />
              </div>
            </div>

            <div className="flex mb-4 text-sm">
              <div className="flex gap-5">
                <div className="flex items-center gap-1">
                  <span className="text-xs uppercase text-amber-200/80">
                    wins
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900/70 border border-amber-500/70 text-amber-200 font-semibold">
                    {teams.wins}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-xs uppercase text-amber-200/80">
                    losses
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900/70 border border-emerald-500/70 text-emerald-200 font-semibold">
                    {teams.losses}
                  </span>
                </div>
              </div>
            </div>

            <div className="">
              <div className="space-y-2 text-xs">
                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">delta:</span>{" "}
                  {teams.delta}
                </div>
                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">
                    last_match_time:
                  </span>{" "}
                  {teams.last_match_time}
                </div>
                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">tag:</span>{" "}
                  {teams.tag}
                </div>
                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">match_id:</span>{" "}
                  {teams.match_id}
                </div>
                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">team_id:</span>{" "}
                  {teams.team_id}
                </div>
                <div className="text-gray-300">
                  <span className="font-bold text-amber-300">rating:</span>{" "}
                  {teams.rating}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={() => setShow(!show)}
                className="border-2 font-bold border-amber-400/60 rounded-xl px-4 py-2 bg-gradient-to-tr from-slate-900 via-emerald-900 to-amber-700 text-white hover:scale-105 transition"
              >
                Matches
              </button>
              <button
                onClick={() => setShowplayers(!showplayer)}
                className="border-2 font-bold border-amber-400/60 rounded-xl px-4 py-2 bg-gradient-to-tr from-slate-900 via-emerald-900 to-amber-700 text-white hover:scale-105 transition"
              >
                Players
              </button>
              <button
                onClick={() => setShowHeroes(!showHeros)}
                className="border-2 font-bold border-amber-400/60 rounded-xl px-4 py-2 bg-gradient-to-tr from-slate-900 via-emerald-900 to-amber-700 text-white hover:scale-105 transition"
              >
                Heroes
              </button>
            </div>
          </div>
        )}
      </div>

      {show && (
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 mt-10">
          {matches.map((match, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-amber-500 bg-slate-900 text-white hover:shadow-lg"
            >
              <p>
                <b className="font-bold text-amber-300">Match ID:</b>{" "}
                {match.match_id}
              </p>
              <p>
                <b className="font-bold text-amber-300">League:</b>{" "}
                {match.league_name}
              </p>
              <p>
                <b className="font-bold text-amber-300">Radiant Score:</b>{" "}
                {match.radiant_score}
              </p>
              <p>
                <b className="font-bold text-amber-300">Dire Score:</b>{" "}
                {match.dire_score}
              </p>
              <p>
                <b className="font-bold text-amber-300">Opponent Team:</b>{" "}
                {match.opposing_team_id}
              </p>
              <p>
                <b className="font-bold text-amber-300">Start Time:</b>{" "}
                {match.start_time}
              </p>
            </div>
          ))}
        </div>
      )}

      {showplayer && (
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 mt-10">
          {players.map((player, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-amber-500 bg-slate-900 text-white hover:shadow-lg"
            >
              <button
                onClick={() => {
                  localStorage.setItem(
                    "playerId",
                    JSON.stringify(player.account_id),
                  );
                  navigate("/userinfos");
                }}
              >
                <b className="font-bold text-amber-300">account_id:</b>{" "}
                {player.account_id}
              </button>
              <p>
                <b className="font-bold text-amber-300">games_played:</b>{" "}
                {player.games_played}
              </p>
              <p>
                <b className="font-bold text-amber-300">name:</b> {player.name}
              </p>
              <p>
                <b className="font-bold text-amber-300">wins:</b> {player.wins}
              </p>
            </div>
          ))}
        </div>
      )}

      {showHeros && (
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 mt-10">
          {heros.map((heros, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-amber-500 bg-slate-900 text-white hover:shadow-lg"
            >
              <p>
                <b className="font-bold text-amber-300">games_played:</b>{" "}
                {heros.games_played}
              </p>
              <p>
                <b className="font-bold text-amber-300">hero_id:</b>{" "}
                {heros.hero_id}
              </p>
              <p>
                <b className="font-bold text-amber-300">localized_name:</b>{" "}
                {heros.localized_name}
              </p>
              <p>
                <b className="font-bold text-amber-300">wins:</b> {heros.wins}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamsInfo;
