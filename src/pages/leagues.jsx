import { useState, useEffect } from "react";
import axios from "axios";
import Headers from "../components/Headers";

function Leagues() {

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get("https://api.opendota.com/api/heroes")
      .then((res) => {
        setMatches(res.data);
        console.log(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">

      <Headers />

      <h1 className="text-3xl text-center mt-10">
        Leagues
      </h1>

      <div className="grid md:grid-cols-3 gap-6 p-10">

        {matches.map((match, index) => (

          <div
            key={match.match_id || index}
            className="bg-gray-800 p-5 rounded-lg"
          >

            <p className="text-gray-400 mb-2">
              Match ID: {match.mattack_type}
            </p>

            <div className="flex justify-between mt-4 text-lg">

              <span>
                {match.radiant_team?.name
                  ? match.radiant_team.name
                  : "Radiant Team"}
              </span>

              <span className="text-red-400">
                VS
              </span>

              <span>
                {match.dire_team?.name
                  ? match.dire_team.name
                  : "Dire Team"}
              </span>

            </div>

            <p className="mt-3 text-sm text-gray-400">
              Spectators: {match.spectators || "Unknown"}
            </p>

           <a
                href="https://www.twitch.tv/dota2ti"
                target="_blank"
                className="block mt-4 text-center bg-blue-600 py-2 rounded"
              >
                Watch
              </a>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Leagues;