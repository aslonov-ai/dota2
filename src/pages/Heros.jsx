import { useEffect, useState } from "react";
import Headers from "../components/Headers";
import axios from "axios";

function Heros() {
    const [heroes, setHeroes] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedHero, setSelectedHero] = useState(null);
    const [matches, setMatches] = useState([]);
    const [matchups, setMatchups] = useState([]);
    const [durations, setDurations] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get("https://api.opendota.com/api/heroes")
            .then(res => setHeroes(res.data))
            .catch(err => console.error(err));
    }, []);

    const openHero = async (hero) => {
        try {
            const [matchRes, matchupRes, durationRes, playersRes] = await Promise.all([
                axios.get(`https://api.opendota.com/api/heroes/${hero.id}/matches`),
                axios.get(`https://api.opendota.com/api/heroes/${hero.id}/matchups`),
                axios.get(`https://api.opendota.com/api/heroes/${hero.id}/durations`),
                axios.get(`https://api.opendota.com/api/heroes/${hero.id}/players`)
            ]);

            setMatches(matchRes.data.slice(0, 5));
            setMatchups(matchupRes.data);
            setDurations(durationRes.data.slice(0, 5));
            setPlayers(playersRes.data.slice(0, 5));
            setSelectedHero(hero);
        } catch (err) {
            console.error(err);
        }
    };

    const closeHero = () => {
        setSelectedHero(null);
        setMatches([]);
        setMatchups([]);
        setDurations([]);
        setPlayers([]);
    };

    const formatDuration = (sec) => {
        const min = Math.floor(sec / 60);
        const s = sec % 60;
        return `${min}m ${s}s`;
    };

    const formatDate = (unix) => unix ? new Date(unix * 1000).toLocaleDateString() : "N/A";

    const filteredHeroes = heroes.filter(hero =>
        hero.localized_name.toLowerCase().includes(search.toLowerCase())
    );

    const getHeroById = (id) => heroes.find(h => h.id === id);

    const getHeroImg = (hero) => hero?.img ? `https://api.opendota.com${hero.img}` : "/placeholder.png";

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-10 font-sans">
            <Headers />
            <h1 className="text-center text-6xl font-extrabold mb-12
        bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400
        bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,0,255,0.7)]
        animate-[pulse_2s_ease-in-out_infinite]">
                DOTA 2 HEROES
            </h1>

            <div className="flex justify-center mb-12">
                <input
                    type="text"
                    placeholder="Search hero..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-96 px-5 py-3 rounded-3xl bg-zinc-900
            border-2 border-cyan-500/50 text-white text-lg font-semibold
            placeholder:text-gray-400 placeholder:italic
            focus:outline-none focus:ring-4 focus:ring-cyan-400/40
            focus:border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)]
            transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.8)]
            animate-[pulse_3s_ease-in-out_infinite]"
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {filteredHeroes.map(hero => (
                    <div
                        key={hero.id}
                        onClick={() => openHero(hero)}
                        className="bg-zinc-900 rounded-3xl p-3 cursor-pointer
              transform transition duration-300 hover:scale-110
              hover:shadow-[0_0_25px_rgba(0,255,255,0.6),0_0_35px_rgba(255,0,255,0.4)]
              border-2 border-transparent hover:border-cyan-400 animate-[float_5s_ease-in-out_infinite] relative"
                    >
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={getHeroImg(hero)}
                                alt={hero.localized_name}
                                className="rounded-2xl mb-3 shadow-xl hover:shadow-[0_0_35px_rgba(0,255,255,0.8)]
                  transition duration-500 transform hover:scale-110"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr
                  from-purple-500 via-pink-500 to-cyan-400 opacity-20
                  pointer-events-none animate-[glow_4s_ease-in-out_infinite]"></div>
                        </div>
                        <h2 className="text-white text-center font-bold text-lg
              hover:text-cyan-400 transition-colors drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
                            {hero.localized_name}
                        </h2>
                    </div>
                ))}
            </div>

            {selectedHero && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
                    <div className="bg-[#111117] w-[1000px] h-[700px] rounded-3xl shadow-2xl flex overflow-hidden relative animate-[modalOpen_0.5s_ease]">

                        <button
                            onClick={closeHero}
                            className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-cyan-400 transition-colors">
                            ✕
                        </button>

                        <div className="w-1/2 p-8 overflow-y-auto border-r border-cyan-500/30 space-y-6">

                            <h3 className="text-cyan-400 text-2xl font-bold tracking-wide">Recent Matches</h3>
                            {matches.map(match => {
                                const didWin = (match.radiant && match.radiant_win) || (!match.radiant && !match.radiant_win);
                                return (
                                    <div key={match.match_id} className={`p-4 rounded-xl
                    border-2 ${didWin ? "border-green-400 bg-green-900/20" : "border-red-500 bg-red-900/20"}
                    hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition transform`}>
                                        <div className="flex justify-between text-white font-semibold">
                                            <span>{match.radiant_name || "Radiant"} vs {match.dire_name || "Dire"}</span>
                                            <span>{didWin ? "WIN" : "LOSE"}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {formatDuration(match.duration)} • {formatDate(match.start_time)}
                                        </div>
                                    </div>
                                );
                            })}

                            <h3 className="text-cyan-400 text-2xl font-bold mt-6 tracking-wide">Matchups</h3>
                            {matchups.map(m => {
                                const opponent = getHeroById(m.hero_id);
                                const winRate = m.games_played > 0 ? ((m.wins / m.games_played) * 100).toFixed(0) : 0;
                                return (
                                    <div key={m.hero_id}>
                                        <div className="flex justify-between text-white text-sm mb-1">
                                            <span>{opponent ? opponent.localized_name : "Unknown"}</span>
                                            <span>{m.games_played > 0 ? `${winRate}%` : "No data"}</span>
                                        </div>
                                        <div className="w-full h-2 bg-zinc-800 rounded-lg">
                                            {m.games_played > 0 ? (
                                                <div className={`h-2 rounded-lg transition-all duration-500
                          ${winRate >= 50
                                                        ? "bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500"
                                                        : "bg-gradient-to-r from-red-500 via-pink-500 to-purple-500"}`}
                                                    style={{ width: `${winRate}%` }}>
                                                </div>
                                            ) : (
                                                <div className="h-2 rounded-lg bg-zinc-600 animate-pulse"></div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            <h3 className="text-cyan-400 text-2xl font-bold mt-6 tracking-wide">Match Durations</h3>
                            {durations.map((d, i) => {
                                const winRate = d.games_played > 0 ? ((d.wins / d.games_played) * 100).toFixed(0) : 0;
                                return (
                                    <div key={i} className="mb-3">
                                        <div className="flex justify-between text-white text-sm mb-1">
                                            <span>{d.duration_bin} min</span>
                                            <span>{d.games_played > 0 ? `${winRate}% wins` : "No data"}</span>
                                        </div>
                                        <div className="w-full h-2 bg-zinc-800 rounded-lg">
                                            {d.games_played > 0 ? (
                                                <div
                                                    className={`h-2 rounded-lg transition-all duration-500
                          ${winRate >= 50
                                                            ? "bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500"
                                                            : "bg-gradient-to-r from-red-500 via-pink-500 to-purple-500"}`}
                                                    style={{ width: `${winRate}%` }}
                                                ></div>
                                            ) : (
                                                <div className="h-2 rounded-lg bg-zinc-600 animate-pulse"></div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            <h3 className="text-cyan-400 text-2xl font-bold mt-6 tracking-wide">Top Players</h3>
                            {players.length > 0 ? players.map((p, i) => {
                                const winRate = p.games_played > 0 ? ((p.wins / p.games_played) * 100).toFixed(0) : 0;
                                return (
                                    <div key={i} className="mb-3 p-3 rounded-lg bg-zinc-900 border border-cyan-500/30">
                                        <div className="flex justify-between text-white text-sm">
                                            <span>Account ID: {p.account_id}</span>
                                            <span>Win Rate: {winRate}%</span>
                                        </div>
                                        <div className="text-gray-400 text-xs mt-1">
                                            Games Played: {p.games_played} • Last Played: {formatDate(p.last_played)}
                                        </div>
                                    </div>
                                );
                            }) : <div className="text-gray-500">No player data</div>}

                        </div>

                        <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
                            <img
                                src={getHeroImg(selectedHero)}
                                alt={selectedHero.localized_name}
                                className="w-72 mb-6 rounded-2xl shadow-[0_0_30px_cyan] transition transform hover:scale-110"
                            />
                            <h2 className="text-4xl text-white font-bold mb-4
                bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                                {selectedHero.localized_name}
                            </h2>
                            <div className="text-gray-300 space-y-2 text-center">
                                <div className="text-lg">Primary: {selectedHero.primary_attr.toUpperCase()}</div>
                                <div className="text-lg">Attack: {selectedHero.attack_type}</div>
                                <div className="flex flex-wrap justify-center gap-2 mt-3">
                                    {selectedHero.roles.map((role, i) => (
                                        <span key={i} className="px-3 py-1 bg-zinc-800 border border-cyan-500/30 rounded-lg text-xs text-cyan-300 hover:bg-cyan-600/30 transition">
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <style>{`
        @keyframes modalOpen {
          0% { opacity: 0; transform: scale(0.9) translateY(50px);}
          100% { opacity: 1; transform: scale(1) translateY(0);}
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.35; }
        }
      `}</style>
        </div>
    );
}

export default Heros;