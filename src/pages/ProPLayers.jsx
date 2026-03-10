import axios from "axios";
import { useEffect, useState } from "react";
import Headers from "../components/Headers";
import { Link, useNavigate } from "react-router-dom";

function ProPLayers() {
  const [players, setPlayers] = useState([]);
const navigate=useNavigate()

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/proPlayers")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => console.log("API ishlamadi", error));
  }, []);

  return (
    <div className="bg-gray-900">
      <div>
        <Headers />
      </div>
      <div className="my-20 flex justify-center gap-4">
        <button className="relative group overflow-hidden border-2 border-[#ffaa33] p-3 px-6 text-white font-bold rounded-lg bg-gradient-to-r from-[#2a3a4a] to-[#1a2a3a] hover:from-[#3a4a5a] hover:to-[#2a3a4a] transition-all duration-300 shadow-[0_0_10px_#ffaa33] hover:shadow-[0_0_20px_#ffaa33] hover:scale-105">
          <div className="absolute inset-0 bg-[#ffaa33] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ffaa33] group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ffaa33] group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ffaa33] group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ffaa33] group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-[#ffaa33] text-xl">⚔️</span>
            Pro Players
          </span>
        </button>

        <Link to={'/users'} className="relative group overflow-hidden border-2 border-[#88ccff] p-3 px-6 text-white font-bold rounded-lg bg-gradient-to-r from-[#1a2a3a] to-[#0f1a24] hover:from-[#2a3a4a] hover:to-[#1a2a3a] transition-all duration-300 shadow-[0_0_10px_#88ccff] hover:shadow-[0_0_20px_#88ccff] hover:scale-105">
          <div className="absolute inset-0 bg-[#88ccff] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#88ccff] group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#88ccff] group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#88ccff] group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#88ccff] group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-[#88ccff] text-xl">🛡️</span>
            Top Players
          </span>
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-2 md:p-0 lg:max-w-7xl mx-auto md:max-w-2xl ">
        {players.map((player, index) => (
          <div className="text-white bg-gradient-to-b from-[#1a2a3a] to-[#0f1a24] rounded-xl border-2 border-[#3a4a5a] p-2 hover:shadow-[0_0_20px_#00ff88] hover:border-[#00ff88] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMkwyIDMybDE4LTYgMTggNi0xOC0zMHoiIGZpbGw9IiMyMjMzNDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
            <h2 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b8d8ff] to-[#f0f0f0] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] relative z-10">
              {player.name}
            </h2>
            <div className="flex justify-center my-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff8800] to-[#ff5500] rounded-full blur-md opacity-50"></div>
              <div className="relative">
                <div className="absolute inset-0 border-4 border-[#ffaa33] rounded-full animate-pulse"></div>
                <img onClick={() => {
                  localStorage.setItem(
                    "playerId",
                    JSON.stringify(player.account_id),
                  );
                  navigate("/userinfos");
                }}
                  className="rounded-full w-30 h-30 border-4 border-[#ccaa66] shadow-[0_0_15px_#ffaa33] relative z-10"
                  src={player.avatarfull}
                />
              </div>
            </div>
            <div className="space-y-2 relative z-10">
              <h2 className="border-2 hover:border-[#ffaa33] flex justify-center bg-[#2a3a4a]/80 p-1 rounded-lg border border-[#4a5a6a] shadow-inner text-[#e8e8e8] font-medium">
                <span className="text-[#ffaa33] mr-2">⚔️</span> personaname:
                {player.personaname}
              </h2>
              <div className="grid grid-cols-2 gap-1">
                <p className="border-2 hover:border-[#ffaa33] flex justify-center bg-[#2a3a4a]/60 p-1 rounded-lg border border-[#4a5a6a] text-sm">
                  <span className="text-[#88ccff] mr-1">🌍</span> country_code:
                  {player.country_code}
                </p>
                <p className="border-2 hover:border-[#ffaa33] flex justify-center bg-[#2a3a4a]/60 p-1 rounded-lg border border-[#4a5a6a] text-sm">
                  <span className="text-[#88ccff] mr-1">⚡</span> fantasy_role:
                  {player.fantasy_role}
                </p>
              </div>
              <p className="border-2 hover:border-[#ffaa33] flex justify-center bg-[#2a3a4a]/60 p-1 rounded-lg border border-[#4a5a6a]">
                <span className="text-[#88ccff] mr-2">📍</span> loccountrycode :
                {player.loccountrycode}
              </p>
              <div className="grid grid-cols-2 gap-1">
                <p className="border-2 hover:border-[#ffaa33] flex justify-center bg-[#2a3a4a]/60 p-1 rounded-lg border border-[#4a5a6a] text-sm">
                  <span className="text-[#88ccff] mr-1">🏷️</span> team_id :
                  {player.team_id}
                </p>
                <p className="border-2 hover:border-[#ffaa33] flex justify-center bg-[#2a3a4a]/60 p-1 rounded-lg border border-[#4a5a6a] text-sm">
                  <span className="text-[#88ccff] mr-1">🔰</span> team_tag :
                  {player.team_tag}
                </p>
              </div>
              <p className="flex justify-center bg-gradient-to-r from-[#3a4a5a] to-[#2a3a4a] p-2 rounded-lg border-2 hover:border-[#ffaa33] font-bold">
                <span className="text-[#ffaa33] mr-2">🏆</span> team_name :
                {player.team_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProPLayers;
