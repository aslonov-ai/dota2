import { useState, useEffect } from "react";
import axios from "axios";
import Headers from "../components/Headers";

function Leagues() {

  const [table, setMatches] = useState([]);

  useEffect(() => {
    axios.get("https://api.opendota.com/api/schema")
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

      <div>
        <h1 className="text-3xl font-bold text-center mt-20">
        LEAGUES
      </h1>
      
      </div>

      <div className="grid md:grid-cols-3 gap-6 p-10">

        {table.map((table, index) => (
    
          <div
            key={table.table_id || index}
            className="bg-gray-800 p-5 rounded-lg"
          >

            <p className="text-gray-400 mb-2">
              {/* Match ID: {table.mattack_type} */}
            </p>
            <div className="flex justify-between mt-4 text-lg">
              <span>
                {table.table_name}
              </span>
              {/* <span className="text-red-400">
                VS
              </span> */}
              <span>
                {table.column_name}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Spectators: {table.data_type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leagues;