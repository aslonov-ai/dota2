import { useEffect, useState } from "react";
import Headers from "../components/Headers";

function Heros() {
    const [heroes, setHeroes] = useState([]);
    const [selectedHero, setSelectedHero] = useState(null);
    const [matches, setMatches] = useState([]);
    const [matchesModalOpen, setMatchesModalOpen] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("https://api.opendota.com/api/heroStats")
            .then(res => res.json())
            .then(data => setHeroes(data));
    }, []);

    const filteredHeroes = heroes.filter(hero =>
        hero.localized_name.toLowerCase().includes(search.toLowerCase())
    );

    const colors = ["cyan", "pink", "purple", "yellow", "lime", "fuchsia", "rose"];

    const fetchMatches = (hero_id) => {
        fetch(`https://api.opendota.com/api/heroes/${hero_id}/matches`)
            .then(res => res.json())
            .then(data => {
                setMatches(data);
                setMatchesModalOpen(true);
            });
    };

    return (
        <div>
            <Headers />
            <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white p-10">
                <h1 className="text-5xl font-extrabold text-center mb-8 tracking-widest drop-shadow-lg text-[#00ffff] mt-10">
                    DOTA HEROES
                </h1>

                <div className="mb-8 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search Hero..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-80 sm:w-96 p-3 rounded-lg text-black font-semibold outline-none border-2 border-cyan-400 
               bg-black/80 placeholder-gray-400 text-white shadow-lg shadow-cyan-400/50
               focus:border-pink-400 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition-all duration-300"
                    />
                </div>

                {!matchesModalOpen && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredHeroes.map((hero, idx) => {
                            const color = colors[idx % colors.length];
                            return (
                                <div
                                    key={hero.id}
                                    onClick={() => setSelectedHero(hero)}
                                    className="cursor-pointer relative rounded-xl overflow-hidden border transition-transform duration-300 hover:scale-105 hover:brightness-110"
                                    style={{
                                        borderColor: `var(--tw-${color}-400)`,
                                        boxShadow: `0 0 10px 0 var(--tw-${color}-400)`,
                                    }}
                                >
                                    <img
                                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace("npc_dota_hero_", "")}.png`}
                                        alt={hero.localized_name}
                                        className="w-full h-44 object-cover transition duration-300 hover:brightness-125"
                                    />
                                    <div
                                        className="absolute bottom-0 w-full text-center py-2 backdrop-blur-sm"
                                        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                                    >
                                        <h2
                                            className={`text-sm font-bold uppercase tracking-wider`}
                                            style={{ color: `var(--tw-${color}-400)` }}
                                        >
                                            {hero.localized_name}
                                        </h2>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {selectedHero && !matchesModalOpen && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-300 overflow-auto p-4">
                        <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 border shadow-2xl relative animate-fadeIn"
                            style={{ borderColor: "#ff00ff", boxShadow: "0 0 25px 5px #ff00ff" }}>
                            <button
                                onClick={() => setSelectedHero(null)}
                                className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                            >
                                ✕
                            </button>
                            <img
                                src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${selectedHero.name.replace("npc_dota_hero_", "")}.png`}
                                alt={selectedHero.localized_name}
                                className="w-full h-64 object-cover rounded-xl mb-4 border-4"
                                style={{ borderColor: "#00ffff", boxShadow: "0 0 25px 5px #00ffff" }}
                            />
                            <h2 className="text-3xl font-extrabold mb-4 text-center drop-shadow-md" style={{ color: "#ff69b4" }}>
                                {selectedHero.localized_name}
                            </h2>
                            <div className="text-gray-300 space-y-1 text-center mb-4">
                                <p>
                                    <span style={{ color: "#00ff00", fontWeight: "bold" }}>
                                        Attack:
                                    </span> {selectedHero.attack_type}
                                </p>
                                <p>
                                    <span style={{ color: "#ffdd00", fontWeight: "bold" }}>
                                        Attribute:
                                    </span> {selectedHero.primary_attr}
                                </p>
                                <p>
                                    <span style={{ color: "#ff4500", fontWeight: "bold" }}>
                                        Roles:
                                    </span> {selectedHero.roles.join(", ")}
                                </p>
                                <p>
                                    <span style={{ color: "#00ffff", fontWeight: "bold" }}>
                                        Damage:
                                    </span> {selectedHero.base_attack_min}-{selectedHero.base_attack_max}
                                </p>
                                <p>
                                    <span style={{ color: "#ff00ff", fontWeight: "bold" }}>
                                        Speed:
                                    </span> {selectedHero.move_speed}
                                </p>
                            </div>

                            <div className="text-center mt-4">
                                <button
                                    onClick={() => fetchMatches(selectedHero.id)}
                                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition duration-300"
                                >
                                    Show Matches
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {matchesModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 transition-opacity duration-300 overflow-auto p-4">
                        <div
                            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl max-w-lg w-full p-6 border-2 border-cyan-400 shadow-neon relative animate-fadeIn"
                            style={{
                                boxShadow: "0 0 20px #00ffff, 0 0 40px #ff00ff, 0 0 60px #ffdd00",
                            }}
                        >
                            <button
                                onClick={() => {
                                    setMatchesModalOpen(false);
                                    setMatches([]);
                                    setSelectedHero(null);
                                }}
                                className="absolute top-3 right-4 text-gray-300 hover:text-white text-2xl font-bold transition duration-300"
                            >
                                ✕
                            </button>

                            <h2 className="text-3xl font-extrabold mb-6 text-center text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">
                                {selectedHero?.localized_name} Matches
                            </h2>

                            <div className="max-h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-700">
                                {matches.map(match => (
                                    <div
                                        key={match.match_id}
                                        className="p-4 rounded-2xl border border-cyan-500 bg-black/40 hover:bg-gradient-to-r from-cyan-500/30 via-pink-500/30 to-yellow-500/30 transition-all duration-300 shadow-lg hover:shadow-neon"
                                    >
                                        <p><span className="font-bold text-yellow-400">Match ID:</span> {match.match_id}</p>
                                        <p><span className="font-bold text-yellow-400">Radiant:</span> {match.radiant_name} ({match.radiant_score})</p>
                                        <p><span className="font-bold text-red-400">Dire:</span> {match.dire_name} ({match.dire_score})</p>
                                        <p><span className="font-bold text-green-400">Winner:</span> {match.radiant_win ? "Radiant" : "Dire"}</p>
                                        <p><span className="font-bold text-blue-400">Duration:</span> {Math.floor(match.duration / 60)} min</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}


                <style>{`
                .shadow-neon {
                    box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff, 0 0 30px #ffdd00;
                }
                /* Scrollbar stilini chiroyli qilish */
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #1f1f1f;
                    border-radius: 10px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #00ffff;
                    border-radius: 10px;
                } 
                @keyframes fadeIn {
                0% { opacity: 0; transform: translateY(-10px);}
                100% { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeIn {
                animation: fadeIn 0.3s ease-out forwards;
                }
                `}</style>
            </div>
        </div>
    );
}

export default Heros;