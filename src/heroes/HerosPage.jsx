import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function HerosPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [hero, setHero] = useState(null);
    const [players, setPlayers] = useState([]);
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetch("https://api.opendota.com/api/heroStats")
            .then(res => res.json())
            .then(data => {
                const foundHero = data.find(h => h.id === Number(id));
                setHero(foundHero);
            });

        fetch(`https://api.opendota.com/api/heroes/${id}/players`)
            .then(res => res.json())
            .then(data => setPlayers(data.slice(0, 30)));

        fetch(`https://api.opendota.com/api/heroes/${id}/itemPopularity`)
            .then(res => res.json())
            .then(data => setItems(data));
    }, [id]);

    if (!hero) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl">
                Loading...
            </div>
        );
    }

    const heroImg = hero.name.replace("npc_dota_hero_", "");

    const renderItems = (itemsObj) => {
        if (!itemsObj) return null;
        return Object.entries(itemsObj).map(([item, count]) => (
            <div key={item} className="flex items-center gap-3 bg-black/50 p-2 rounded-xl backdrop-blur hover:scale-105 transition">
                <img
                    src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/items/${item}_lg.png`}
                    className="w-10 h-10"
                    onError={(e) => { e.target.style.display = "none" }}
                />
                <div>
                    <p className="text-sm capitalize">{item.replaceAll("_", " ")}</p>
                    <p className="text-xs text-gray-400">{count} picks</p>
                </div>
            </div>
        ));
    };

    return (
        <div
            className="min-h-screen text-white p-10 bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: `url(https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroImg}.png)`
            }}
        >
            <div className="relative z-10 max-w-6xl mx-auto space-y-16">

                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur transition text-lg"
                >
                    ← Back
                </button>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative group cursor-pointer">
                        <img
                            src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroImg}.png`}
                            className="w-[420px] rounded-2xl transition duration-500 transform group-hover:brightness-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <h1 className="text-4xl font-extrabold text-cyan-400 drop-shadow-xl">
                                {hero.localized_name}
                            </h1>
                        </div>
                    </div>
                    <div className="bg-black/50 p-6 rounded-3xl backdrop-blur shadow-[0_0_25px_rgba(0,255,255,0.5)]">
                        <h2 className="text-4xl font-extrabold mb-4 text-cyan-400 drop-shadow-md">
                            Hero Stats
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-lg">
                            <div className="bg-black/40 p-3 rounded-xl text-center">
                                <p className="text-gray-400 text-sm">Attack</p>
                                <p className="font-bold">{hero.attack_type}</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl text-center">
                                <p className="text-gray-400 text-sm">Primary Attribute</p>
                                <p className="font-bold">{hero.primary_attr.toUpperCase()}</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl text-center">
                                <p className="text-gray-400 text-sm">Base Health</p>
                                <p className="font-bold">{hero.base_health}</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl text-center">
                                <p className="text-gray-400 text-sm">Base Mana</p>
                                <p className="font-bold">{hero.base_mana}</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl text-center">
                                <p className="text-gray-400 text-sm">Armor</p>
                                <p className="font-bold">{hero.base_armor}</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl text-center">
                                <p className="text-gray-400 text-sm">Attack Range</p>
                                <p className="font-bold">{hero.attack_range}</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl text-center">
                                <p className="text-gray-400 text-sm">Projectile Speed</p>
                                <p className="font-bold">{hero.projectile_speed}</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl text-center">
                                <p className="text-gray-400 text-sm">Turn Rate</p>
                                <p className="font-bold">{hero.turn_rate}</p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                            <div className="bg-black/40 p-3 rounded-xl">
                                <p className="text-gray-400 text-sm">STR</p>
                                <p className="font-bold">{hero.base_str}</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl">
                                <p className="text-gray-400 text-sm">AGI</p>
                                <p className="font-bold">{hero.base_agi}</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl">
                                <p className="text-gray-400 text-sm">INT</p>
                                <p className="font-bold">{hero.base_int}</p>
                            </div>
                        </div>

                        <div className="mt-6 bg-black/40 p-3 rounded-xl text-center">
                            <p className="text-gray-400 text-sm">Roles</p>
                            <p className="font-bold">{hero.roles.join(", ")}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-extrabold mb-6 text-purple-400 drop-shadow-[0_0_10px_rgba(128,0,255,0.7)]">
                        Top Players
                    </h2>
                    {players.length === 0 ? (
                        <p className="text-gray-400 text-center">No top players data available for this hero.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                            {players.map(player => (
                                <div key={player.account_id} className="bg-black/60 p-5 rounded-3xl backdrop-blur-lg hover:bg-black/80 hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(0,255,255,0.5)] flex flex-col justify-between">
                                    <div>
                                        <p className="font-bold text-center text-lg text-cyan-400 drop-shadow-md">
                                            {player.personaname || "Unknown Player"}
                                        </p>
                                        <p className="text-gray-400 text-sm text-center mt-1">{player.account_id}</p>
                                    </div>
                                    <div className="mt-4 text-center flex justify-around">
                                        <p className="text-green-400 font-bold">{player.win} Wins</p>
                                        <p className="text-red-400 font-bold">{player.games} Games</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items && (
                    <div>
                        <h2 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.7)]">
                            Popular Items
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div>
                                <h3 className="mb-3 text-green-400 font-bold">Start</h3>
                                <div className="space-y-2">{renderItems(items.start_game_items)}</div>
                            </div>
                            <div>
                                <h3 className="mb-3 text-yellow-400 font-bold">Early</h3>
                                <div className="space-y-2">{renderItems(items.early_game_items)}</div>
                            </div>
                            <div>
                                <h3 className="mb-3 text-blue-400 font-bold">Mid</h3>
                                <div className="space-y-2">{renderItems(items.mid_game_items)}</div>
                            </div>
                            <div>
                                <h3 className="mb-3 text-red-400 font-bold">Late</h3>
                                <div className="space-y-2">{renderItems(items.late_game_items)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HerosPage;