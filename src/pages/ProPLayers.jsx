import axios from "axios";
import { useEffect, useState } from "react";
import Headers from "../components/Headers";
import { Link, useNavigate } from "react-router-dom";

function ProPLayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/proPlayers")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => console.log("API ishlamadi", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Headers />
      <div className="flex justify-center mt-16">
        {/* <input
          type="text"
          placeholder="Search pro player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 p-2 rounded-lg bg-[#1a2a3a] border border-[#4a5a6a] focus:border-[#ffaa33] outline-none"
        /> */}
      </div>

      <div className="my-10 flex justify-center gap-4">
        <button className="relative group overflow-hidden border-2 border-[#ffaa33] p-3 px-6 text-white font-bold rounded-lg bg-gradient-to-r from-[#2a3a4a] to-[#1a2a3a] hover:scale-105 transition-all">
          ⚔️ Pro Players
        </button>

        <Link
          to={"/users"}
          className="relative group overflow-hidden border-2 border-[#88ccff] p-3 px-6 text-white font-bold rounded-lg bg-gradient-to-r from-[#1a2a3a] to-[#0f1a24] hover:scale-105 transition-all"
        >
          🛡️ Top Players
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-16 h-16 border-4 border-[#ffaa33] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-4 lg:max-w-7xl mx-auto md:max-w-2xl">
          {filteredPlayers.map((player) => (
            <div
              key={player.account_id}
              className="text-white bg-gradient-to-b from-[#1a2a3a] to-[#0f1a24] rounded-xl border-2 border-[#3a4a5a] p-3 hover:shadow-[0_0_20px_#00ff88] hover:border-[#00ff88] transition-all duration-300"
            >
              <h2 className="text-center text-xl font-bold text-[#b8d8ff]">
                {player.name}
              </h2>

              <div className="flex justify-center my-4">
                <img
                  onClick={() => {
                    localStorage.setItem(
                      "playerId",
                      JSON.stringify(player.account_id),
                    );
                    navigate("/userinfos");
                  }}
                  className="rounded-full w-28 h-28 border-4 border-[#ccaa66] shadow-[0_0_15px_#ffaa33] cursor-pointer"
                  src={player.avatarfull}
                />
              </div>

              <div className="space-y-2 text-sm">
                <p className="bg-[#2a3a4a]/60 p-1 rounded text-center">
                  ⚔️ personaname: {player.personaname}
                </p>

                <div className="grid grid-cols-2 gap-1">
                  <p className="bg-[#2a3a4a]/60 p-1 rounded text-center">
                    🌍 {player.country_code}
                  </p>

                  <p className="bg-[#2a3a4a]/60 p-1 rounded text-center">
                    ⚡ {player.fantasy_role}
                  </p>
                </div>

                <p className="bg-[#2a3a4a]/60 p-1 rounded text-center">
                  📍 {player.loccountrycode}
                </p>

                <div className="grid grid-cols-2 gap-1">
                  <p className="bg-[#2a3a4a]/60 p-1 rounded text-center">
                    🏷️ {player.team_id}
                  </p>

                  <p className="bg-[#2a3a4a]/60 p-1 rounded text-center">
                    🔰 {player.team_tag}
                  </p>
                </div>

                <p className="bg-gradient-to-r from-[#3a4a5a] to-[#2a3a4a] p-2 rounded text-center font-bold">
                  🏆 {player.team_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProPLayers;
