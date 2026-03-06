import React, { useState, useEffect } from "react";
import axios from "axios";
import Headers from "../components/Headers";

const API = "https://api.opendota.com/api/live";

function Live() {

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMatches = async () => {
    try {
      const res = await axios.get(API);
      setMatches(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div className="min-h-screen bg-[#06111c] text-white">

      <Headers />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-6">
          Live Matches
        </h1>

        {loading && <p>Loading...</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {matches.map((match) => (

            <div
              key={match.match_id}
              className="bg-[#0f1e2e] border border-[#1e3a5a] p-5 rounded"
            >

              <p className="text-sm text-gray-400 mb-3">
                {match.league_name || "Unknown League"}
              </p>

              <div className="flex justify-between items-center">

                <div className="text-center">
                  <p className="font-bold">
                    {match. _team?.name || "Radiant"}
                  </p>
                </div>

                <span className="text-xl font-bold">
                  VS
                </span>

                <div className="text-center">
                  <p className="font-bold">
                    {match.dire_team?.name || "Dire"}
                  </p>
                </div>

              </div>

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

    </div>
  );
}

export default Live;