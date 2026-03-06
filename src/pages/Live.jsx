import React, { useState, useEffect } from "react";
import Headers from "../components/Headers";
import axios from "axios";
import { div } from "framer-motion/client";

const API_URL = "https://api.opendota.com/api/scenarios/itemTimings";

const FALLBACK = [
  {
    id: 1,
    league: "The International 2025",
    team1: {
      name: "Team Spirit",
      logo: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png",
      score: 1,
    },
    team2: {
      name: "OG",
      logo: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png",
      score: 0,
    },
    duration: "32:14",
    viewers: "124,500",
    game: "Game 2",
    stream: "#",
  },
  {
    id: 2,
    league: "DPC 2025 — Division I",
    team1: {
      name: "Tundra",
      logo: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png",
      score: 0,
    },
    team2: {
      name: "Liquid",
      logo: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png",
      score: 2,
    },
    duration: "48:03",
    viewers: "87,200",
    game: "Game 3",
    stream: "#",
  },
  {
    id: 3,
    league: "ESL One 2025",
    team1: {
      name: "Gaimin Gladiators",
      logo: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png",
      score: 1,
    },
    team2: {
      name: "Virtus.pro",
      logo: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png",
      score: 1,
    },
    duration: "21:55",
    viewers: "62,800",
    game: "Game 2",
    stream: "#",
  },
  {
    id: 4,
    league: "BetBoom Dacha 2025",
    team1: {
      name: "Natus Vincere",
      logo: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png",
      score: 0,
    },
    team2: {
      name: "PSG.LGD",
      logo: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png",
      score: 1,
    },
    duration: "15:40",
    viewers: "45,100",
    game: "Game 1",
    stream: "#",
  },
];

const LiveBadge = () => (
  <span className="flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
    Live
  </span>
);

const MatchCard = ({ match }) => {
  const { league, team1, team2, duration, viewers, game, stream } = match;

  return (
    <div>
      <Headers/>
      <div
      className="relative border transition-all  duration-300 hover:-translate-y-1 cursor-pointer group"
      style={{
        background: "linear-gradient(180deg, #0f1e2e 0%, #0a1520 100%)",
        borderColor: "#1e3a5a",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4a8ab5")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e3a5a")}
    >
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: "#1e3a5a", background: "#0a1520" }}
      >
        <span className="text-[11px] font-semibold tracking-wide text-[#6a8fa8] truncate mr-3">
          {league}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[11px] text-[#6a8fa8]">{game}</span>
          <LiveBadge />
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-5 gap-3">
        {/* <div className="flex flex-col items-center gap-2 flex-1">
          <img src={team1.logo} alt={team1.name} className="w-12 h-12 object-contain opacity-90" />
          <span className="text-white font-bold text-sm text-center leading-tight">{team1.name}</span>
        </div> */}

        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* <span
              className="text-4xl font-black"
              style={{ color: team1.score > team2.score ? "#4c9be8" : "#c8d6e5" }}
            >
              {team1.score}
            </span> */}
            {/* <span className="text-xl font-bold text-[#3a5a78]">:</span> */}
            {/* <span
              className="text-4xl font-black"
              style={{ color: team2.score > team1.score ? "#4c9be8" : "#c8d6e5" }}
            >
              {team2.score}
            </span> */}
          </div>
          {/* <span className="text-[12px] font-mono text-[#4a8ab5] tracking-widest">{duration}</span> */}
        </div>

        {/* <div className="flex flex-col items-center gap-2 flex-1">
          <img src={team2.logo} alt={team2.name} className="w-12 h-12 object-contain opacity-90" />
          <span className="text-white font-bold text-sm text-center leading-tight">{team2.name}</span>
        </div> */}
      </div>

      <div
        className="flex items-center justify-between px-4 py-2.5 border-t"
        style={{ borderColor: "#1e3a5a" }}
      >
        <a
          href={stream}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all duration-200"
          style={{
            background: "linear-gradient(180deg,#4c9be8,#1a6fbd)",
            color: "#fff",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Watch
        </a>
      </div>
    </div>
    </div>
  );
};

const Skeleton = () => (
  <div
    className="border animate-pulse"
    style={{ background: "#0f1e2e", borderColor: "#1e3a5a" }}
  >
    <div
      className="px-4 py-2 border-b"
      style={{ borderColor: "#1e3a5a", background: "#0a1520" }}
    >
      <div className="h-3 w-40 rounded" style={{ background: "#1e3a5a" }} />
    </div>
    <div className="flex items-center justify-between px-5 py-5">
      <div className="flex flex-col items-center gap-2 flex-1">
        <div
          className="w-12 h-12 rounded-full"
          style={{ background: "#1e3a5a" }}
        />
        <div className="h-3 w-20 rounded" style={{ background: "#1e3a5a" }} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="h-9 w-20 rounded" style={{ background: "#1e3a5a" }} />
        <div className="h-3 w-14 rounded" style={{ background: "#1e3a5a" }} />
      </div>
      <div className="flex flex-col items-center gap-2 flex-1">
        <div
          className="w-12 h-12 rounded-full"
          style={{ background: "#1e3a5a" }}
        />
        <div className="h-3 w-20 rounded" style={{ background: "#1e3a5a" }} />
      </div>
    </div>
    <div
      className="flex items-center justify-between px-4 py-2.5 border-t"
      style={{ borderColor: "#1e3a5a" }}
    >
      <div className="h-3 w-16 rounded" style={{ background: "#1e3a5a" }} />
      <div className="h-6 w-16 rounded" style={{ background: "#1e3a5a" }} />
    </div>
  </div>
);

const Live = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchMatches = async () => {
    try {
      const res = await axios.get(API_URL);
      setMatches(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMatches(FALLBACK);
    } finally {
      setLoading(false);
      setLastUpdate(new Date());
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    const id = setInterval(fetchMatches, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="min-h-screen px-4 py-10 md:px-10"
      style={{ background: "#06111c" }}
    >
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mt-9">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <LiveBadge />
              <span className="text-[#6a8fa8] text-[11px] font-semibold tracking-widest uppercase">
                {matches.length} matches
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black uppercase tracking-wide"
              style={{ color: "#c8d6e5" }}
            >
              Live 
            </h1>
          </div>
        </div>

        <div
          className="mt-6 h-px"
          style={{
            background: "linear-gradient(90deg,#4a8ab5,#1e3a5a,transparent)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
          : matches.map((match) => <MatchCard key={match.id} match={match} />)}
      </div>

      {!loading && matches.length === 0 && (
        <div className="max-w-6xl mx-auto text-center py-24">
          <div className="text-6xl mb-4 opacity-20">⚔</div>
          <p className="text-[#3a5a78] text-lg font-semibold uppercase tracking-widest">
            No live matches right now
          </p>
          <p className="text-[#2a4a68] text-sm mt-2">Check back soon</p>
        </div>
      )}
    </div>
  );
};

export default Live;
