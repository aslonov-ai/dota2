import { useEffect, useState } from "react";
import Headers from "../components/Headers";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetch("https://api.opendota.com/api/publicMatches")
      .then(res => res.json())
      .then(data => setMatches(data))
      .catch(err => console.error(err));
  }, []);

  const handleMatchClick = (matchId) => {
    fetch(`https://api.opendota.com/api/matches/${matchId}`)
      .then(res => res.json())
      .then(data => setSelectedMatch(data))
      .catch(err => console.error(err));
  };

  const closeOverlay = () => setSelectedMatch(null);

  return (
    <div className="relative">
      <Headers />

      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white ">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-yellow-400 drop-shadow-[0_0_15px_yellow]">
          🎮 Public Matches
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map(match => (
            <div
              key={match.match_id}
              onClick={() => handleMatchClick(match.match_id)}
              className="p-5 bg-gray-800 rounded-3xl cursor-pointer border-2 border-gray-700
                         hover:border-yellow-400 hover:shadow-[0_0_25px_yellow] hover:bg-gray-700
                         transform hover:-translate-y-2 transition-all duration-300"
            >
              <p className="font-bold text-lg text-yellow-300 hover:text-yellow-500 drop-shadow-md">
                Match ID: {match.match_id}
              </p>
              <p className="text-gray-400 hover:text-gray-200">Lobby Type: {match.lobby_type ?? "N/A"}</p>
              <p className="text-gray-400 hover:text-gray-200">
                Start Time: {match.start_time ? new Date(match.start_time * 1000).toLocaleString() : "N/A"}
              </p>
            </div>
          ))}
        </div>

        {selectedMatch && (
          <div className="fixed inset-0 bg-black/90 flex justify-center items-start pt-20 z-50 backdrop-blur-md">
            <div className="relative w-full max-w-4xl p-6 bg-gray-900 rounded-3xl border-2 border-yellow-400 shadow-2xl animate-fadeIn">

              <div className="flex justify-between mb-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 drop-shadow-[0_0_10px_yellow]">
                  ⚔️ Match Details
                </h2>
                <button
                  onClick={closeOverlay}
                  className="text-yellow-400 hover:text-yellow-200 font-bold text-2xl"
                >
                  ✖
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-300">
                <p><span className="font-semibold text-yellow-300">Match ID:</span> {selectedMatch.match_id}</p>
                <p><span className="font-semibold text-yellow-300">Duration:</span> {selectedMatch.duration ? Math.floor(selectedMatch.duration / 60) + " min" : "N/A"}</p>
                <p><span className="font-semibold text-yellow-300">Radiant Score:</span> {selectedMatch.radiant_score ?? "N/A"}</p>
                <p><span className="font-semibold text-yellow-300">Dire Score:</span> {selectedMatch.dire_score ?? "N/A"}</p>
                <p><span className="font-semibold text-yellow-300">Winner:</span> {selectedMatch.radiant_win !== undefined ? (selectedMatch.radiant_win ? "Radiant" : "Dire") : "N/A"}</p>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-yellow-300 drop-shadow-[0_0_10px_yellow]">Players:</h3>
              {selectedMatch.players && selectedMatch.players.length > 0 ? (
                <ul className="space-y-2 max-h-96 overflow-y-auto text-gray-300">
                  {selectedMatch.players.map((p, i) => (
                    <li key={i} className="flex justify-between bg-gray-800 p-3 rounded-xl shadow-md 
                                           hover:shadow-yellow-400/60 transition-all duration-300 border-l-4 border-yellow-400 hover:border-yellow-500">
                      <span>{p.personaname || "Anonymous"} (Hero ID: {p.hero_id})</span>
                      <span className="font-mono text-yellow-300 hover:text-yellow-400">{p.kills ?? 0}/{p.deaths ?? 0}/{p.assists ?? 0}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No player data available</p>
              )}
            </div>
          </div>
        )}

      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {opacity: 0; transform: translateY(-20px);}
            to {opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
}

export default Matches;