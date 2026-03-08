import { useEffect, useState } from "react";
import Headers from "../components/Headers";
import { useNavigate } from "react-router-dom";

function Heros() {
    const [heroes, setHeroes] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.opendota.com/api/heroStats")
            .then(res => res.json())
            .then(data => setHeroes(data));
    }, []);

    const filteredHeroes = heroes.filter(hero =>
        hero.localized_name.toLowerCase().includes(search.toLowerCase())
    );

    const colors = ["cyan", "pink", "purple", "yellow", "lime", "fuchsia", "rose"];

    return (
        <div className="relative">
            <Headers />

            <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-blue-900 animate-gradient-x z-0"></div>

            <div className="relative z-10 min-h-screen text-white p-10">
                <h1 className="text-5xl font-extrabold text-center mb-8 tracking-widest text-[#00ffff] mt-10 drop-shadow-[0_0_15px_cyan]">
                    DOTA HEROES
                </h1>

                <div className="mb-12 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search Hero..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-80 sm:w-96 p-3 rounded-lg border-2 border-cyan-400 
              bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 
              transition duration-300 outline-none shadow-lg"
                    />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {filteredHeroes.map((hero, idx) => {
                        const color = colors[idx % colors.length];
                        return (
                            <div
                                key={hero.id}
                                onClick={() => navigate(`/heropage/${hero.id}`)}
                                className="group relative cursor-pointer rounded-xl overflow-hidden transform transition duration-500 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_40px_rgba(0,255,255,0.8)]"
                                style={{
                                    border: `2px solid var(--tw-${color}-400)`,
                                }}
                            >
                                <img
                                    src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace(
                                        "npc_dota_hero_",
                                        ""
                                    )}.png`}
                                    alt={hero.localized_name}
                                    className="w-full h-44 object-cover transition duration-500 group-hover:brightness-50"
                                />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <h2
                                        className="text-2xl font-bold uppercase text-center"
                                        style={{
                                            color: `var(--tw-${color}-400)`,
                                            textShadow: `0 0 10px var(--tw-${color}-400}, 0 0 20px var(--tw-${color}-400})`
                                        }}
                                    >
                                        {hero.localized_name}
                                    </h2>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>
                {`
          @keyframes gradient-x {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 10s ease infinite;
          }
        `}
            </style>
        </div>
    );
}

export default Heros;