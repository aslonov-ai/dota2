import { useState, useEffect } from "react";
import axios from "axios";
import Headers from "../components/Headers";

function Leagues() {
  const [table, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/schema")
      .then((res) => {
        setMatches(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Headers />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-down">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
              DOTA 2
            </span>{" "}
            <span className="text-white">LEAGUES</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up">
            Explore the schema of OpenDota – tables, columns, and data types powering the analytics.
          </p>
        </div>
      </div>

      {table.length > 0 ? (
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {table.map((item, index) => (
              <div
                key={item.table_id || index}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:bg-gray-800/80 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/0 via-red-500/0 to-yellow-500/0 group-hover:from-red-500/10 group-hover:via-red-500/5 group-hover:to-yellow-500/10 transition-all duration-500 pointer-events-none"></div>

                <div className="flex items-center justify-between mb-4">
                  
                  <span className="text-xs font-mono text-gray-500 bg-gray-900/50 px-2 py-1 rounded-full border border-gray-700">
                    #{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-red-400 transition-colors">
                  {item.table_name}
                </h3>

                <div className="mb-3">
                  <span className="text-sm text-gray-400">Column:</span>
                  <p className="text-lg font-semibold text-yellow-400 truncate">
                    {item.column_name}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
                  <span className="text-sm text-gray-400">Data Type</span>
                  <span className="px-3 py-1 bg-gray-900 rounded-full text-xs font-mono text-red-400 border border-gray-700">
                    {item.data_type}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Leagues;