import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function UserInfos() {
  const [user, setUser] = useState(null);
  let playerId = JSON.parse(localStorage.getItem("playerId"));
  useEffect(() => {
    axios
      .get("https://api.opendota.com/api/players/" + playerId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log("Api ishlamadi:", error);
      });
  }, []);

  return (
    <div className="bg-[#212121] min-h-screen py-20">
      {user && (
        <div className=" lg:max-w-5xl md:max-w-2xl max-w-2xs mx-auto relative h-[580px]">
          <div className="absolute inset-0 z-50 grid grid-cols-3 grid-rows-3 pointer-events-none">
            <div className="peer/tl"></div>
            <div className="peer/tc"></div>
            <div className="peer/tr"></div>
            <div className="peer/ml"></div>
            <div className="peer/cc"></div>
            <div className="peer/mr"></div>
            <div className="peer/bl"></div>
            <div className="peer/bc"></div>
            <div className="peer/br"></div>
          </div>
          <div className="absolute inset-0 transition-all duration-300 ease-out [transform-style:preserve-3d]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.4),0_25px_60px_rgba(0,0,0,0.7)]">
              <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,#7c3aed,#ec4899,#06b6d4,#7c3aed)] p-[2px] animate-spin [animation-duration:8s]">
                <div className="w-full h-full rounded-2xl bg-slate-950"></div>
              </div>
              <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-b from-slate-900 via-violet-950/90 to-slate-950 overflow-hidden">
                <div className="relative h-full p-4 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <defs>
                          <linearGradient
                            id="gem"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#fef08a"></stop>
                            <stop offset="50%" stopColor="#fbbf24"></stop>
                            <stop offset="100%" stopColor="#f59e0b"></stop>
                          </linearGradient>
                        </defs>

                        <path d="M12 2L3 9L12 22L21 9L12 2Z" fill="url(#gem)" />
                        <path
                          d="M12 2L3 9H21L12 2Z"
                          fill="white"
                          opacity="0.5"
                        />
                      </svg>

                      <span className="text-xl font-bold tracking-[4px] bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                        Player
                      </span>
                    </div>

                    <Link
                      to={"/users"}
                      className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-400 via-purple-600 to-indigo-800 flex items-center justify-center border-2 border-violet-300/60"
                    >
                      <div className="text-2xl font-black text-white">Back</div>
                    </Link>
                  </div>

                  <div className="text-center mb-2">
                    <div className="text-3xl font-black tracking-wider bg-gradient-to-b from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
                      {user.profile.personaname}
                    </div>
                  </div>

                  <div className="flex justify-center ">
                    <img
                      className="relative rounded-xl border-3 border-violet-500/30"
                      src={user.profile.avatarfull}
                    />
                  </div>

                  <div className="my-2 py-1.5 rounded-full bg-gradient-to-r from-transparent via-violet-900/50 to-transparent border-y border-violet-600/20">
                    <p className="text-sm text-center text-violet-200/90 tracking-[3px] font-medium">
                      account_id: {user.profile.account_id}
                    </p>
                  </div>

                  <div className="flex-1 rounded-lg bg-gradient-to-b from-slate-900/80 via-violet-950/60 to-slate-900/90 border border-violet-700/20 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-violet-800/60 text-xs text-violet-200 font-semibold">
                        rank_tier: {user.rank_tier?user.rank_tier:'-'}
                      </span>

                      <span className="px-2 py-0.5 rounded-full bg-slate-800/60 text-xs text-slate-300 font-semibold">
                        cheese: {user.profile.cheese}
                      </span>
                    </div>

                    <p className="text-sm text-violet-100 mb-2">
                      <span className="text-pink-400 font-bold italic">
                        avatar---
                      </span>{" "}
                      {user.profile.avatar}
                    </p>
                    <p className="text-sm text-violet-100 mb-2">
                      <span className="text-pink-400 font-bold italic">
                        avatarfull---
                      </span>{" "}
                      {user.profile.avatarfull}
                    </p>
                    <p className="text-sm text-violet-100 mb-2">
                      <span className="text-pink-400 font-bold italic">
                        avatarmedium---
                      </span>{" "}
                      {user.profile.avatarmedium}
                    </p>
                    <p className="text-sm text-violet-100 mb-2">
                      <span className="text-pink-400 font-bold italic">
                        computed_mmr--
                      </span>{" "}
                      {user.computed_mmr}
                    </p>
                    <p className="text-sm text-violet-100 mb-2">
                      <span className="text-pink-400 font-bold italic">
                        steamId--
                      </span>{" "}
                      {user.profile.steamid}
                    </p>
                    <p className="text-sm text-violet-100 mb-2">
                      <span className="text-pink-400 font-bold italic">
                        profileUrl--
                      </span>{" "}
                      {user.profile.profileurl}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfos;
