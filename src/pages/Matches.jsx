import { useEffect, useState } from "react";
import Headers from "../components/Headers";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetch("https://api.opendota.com/api/publicMatches")
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error(err));
  }, []);

  const handleMatchClick = (matchId) => {
    fetch(`https://api.opendota.com/api/matches/${matchId}`)
      .then((res) => res.json())
      .then((data) => setSelectedMatch(data))
      .catch((err) => console.error(err));
  };

  const closeOverlay = () => setSelectedMatch(null);

  return (
    <div>
      <Headers />
      <div className="p-6 bg-gray-900 min-h-screen text-white font-sans relative mt-10">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-yellow-400 drop-shadow-lg animate-pulse">
          🎮 Public Matches
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div
              key={match.match_id}
              className="p-5 bg-gray-800 rounded-2xl shadow-lg cursor-pointer border-2 border-gray-700 
                       hover:border-yellow-400 hover:shadow-yellow-400/60 hover:bg-gray-700 
                       transform hover:-translate-y-2 transition-all duration-300"
              onClick={() => handleMatchClick(match.match_id)}
            >
              <p className="font-bold text-lg text-yellow-300 hover:text-yellow-500">Match ID: {match.match_id}</p>
              <p className="text-gray-400 hover:text-gray-200">Lobby Type: {match.lobby_type}</p>
            </div>
          ))}
        </div>

        {selectedMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-20 z-50">
            <div className="relative w-full max-w-4xl p-6 bg-gray-800 rounded-3xl shadow-2xl border-2 border-yellow-400">
              <button
                onClick={closeOverlay}
                className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 font-bold text-xl"
              >
                ✖
              </button>

              <h2 className="text-3xl font-bold mb-5 text-yellow-400 drop-shadow-md">⚔️ Match Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-gray-300">
                <p>
                  <span className="font-semibold text-yellow-300">
                    Match ID:
                  </span>
                  {selectedMatch.match_id}
                </p>
                <p>
                  <span className="font-semibold text-yellow-300">
                    Duration:
                  </span>
                  {selectedMatch.duration ? Math.floor(selectedMatch.duration / 60) : "N/A"} min
                </p>
                <p>
                  <span className="font-semibold text-yellow-300">
                    Radiant Score:
                  </span>
                  {selectedMatch.radiant_score ?? "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-yellow-300">
                    Dire Score:
                  </span>
                  {selectedMatch.dire_score ?? "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-yellow-300">
                    Winner:
                  </span>
                  {selectedMatch.radiant_win !== undefined ? (selectedMatch.radiant_win ? "Radiant" : "Dire") : "N/A"}
                </p>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-yellow-300 drop-shadow-md">Players:</h3>
              {selectedMatch.players && selectedMatch.players.length > 0 ? (
                <ul className="space-y-3 max-h-80 overflow-y-auto">
                  {selectedMatch.players.map((player, index) => (
                    <li
                      key={player.account_id || index}
                      className="p-3 bg-gray-700 rounded-xl flex justify-between items-center shadow-md 
                               hover:shadow-yellow-400/70 transform hover:scale-105 transition-all duration-300 
                               border-l-4 border-yellow-400 hover:border-yellow-500"
                    >
                      <span className="hover:text-yellow-200">{player.personaname || "Anonymous"} (Hero ID: {player.hero_id})</span>
                      <span className="font-mono text-yellow-300 hover:text-yellow-400">{player.kills ?? 0}/{player.deaths ?? 0}/{player.assists ?? 0}</span>
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
    </div>
  );
}

export default Matches;