import { useState, useEffect } from "react";
import axios from "axios";
import Headers from "../components/Headers";

function Live() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/live")
      .then((res) => {
        setMatches(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Helper function to format time
  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Headers />

      {/* Hero Section with Live Indicator */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <h1 className="text-5xl md:text-6xl font-bold text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
                LIVE
              </span>{" "}
              <span className="text-white">MATCHES</span>
            </h1>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Watch ongoing Dota 2 battles from around the world
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-2">
              <span className="text-gray-400">Currently Live: </span>
              <span className="text-2xl font-bold text-red-500">{matches.length}</span>
              <span className="text-gray-400 ml-1">matches</span>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col justify-center items-center py-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p className="text-gray-400 animate-pulse">Fetching live matches...</p>
        </div>
      )}

      {!isLoading && matches.length === 0 && (
        <div className="text-center py-32">
          <svg
            className="w-24 h-24 mx-auto text-gray-600 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          <h3 className="text-2xl font-bold text-gray-400 mb-2">No Live Matches</h3>
          <p className="text-gray-500">Check back later for ongoing games</p>
        </div>
      )}

      {!isLoading && matches.length > 0 && (
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, index) => (
              <div
                key={match.match_id || index}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-red-500/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-yellow-500"></div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-400">Match #{match.match_id}</span>
                    </div>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold border border-red-500/30">
                      LIVE
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-green-400 truncate max-w-[120px]">
                        {match.radiant_team?.name || "Radiant Team"}
                      </h3>
                    </div>

                    <div className="px-3 py-1 bg-gray-700 rounded-full">
                      <span className="text-sm font-bold text-red-400">VS</span>
                    </div>

                    <div className="flex-1 text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-red-400 truncate max-w-[120px]">
                        {match.dire_team?.name || "Dire Team"}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Score</span>
                      <span className="font-semibold">
                        <span className="text-green-400">{match.radiant_score || 0}</span>
                        <span className="text-gray-400 mx-1">:</span>
                        <span className="text-red-400">{match.dire_score || 0}</span>
                      </span>
                    </div>
                    
                    {match.game_time && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Duration</span>
                        <span className="font-mono text-yellow-400">{formatTime(match.game_time)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Spectators</span>
                      <span className="font-semibold text-blue-400">
                        {match.spectators?.toLocaleString() || "Unknown"}
                      </span>
                    </div>
                  </div>

                  <a
                    href={match.stream_url || "https://www.twitch.tv/dota2ti"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-500 hover:to-yellow-500 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463z" />
                      </svg>
                      WATCH LIVE
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Live;