import { Link } from "react-router-dom";

function UserInfos() {
    let arr=JSON.parse(localStorage.getItem(arr))
    console.log(arr);
    
  return (
   <div className="bg-[#212121] min-h-screen py-20" >
     <div className="lg:max-w-5xl md:max-w-2xl max-w-2xs mx-auto relative h-[580px]">
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
                      <linearGradient id="gem" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fef08a"></stop>
                        <stop offset="50%" stopColor="#fbbf24"></stop>
                        <stop offset="100%" stopColor="#f59e0b"></stop>
                      </linearGradient>
                    </defs>

                    <path d="M12 2L3 9L12 22L21 9L12 2Z" fill="url(#gem)" />
                    <path d="M12 2L3 9H21L12 2Z" fill="white" opacity="0.5" />
                  </svg>

                  <span className="text-[10px] font-bold tracking-[4px] bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                    MYTHIC
                  </span>
                </div>

                <Link to={'/users'} className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-400 via-purple-600 to-indigo-800 flex items-center justify-center border-2 border-violet-300/60">
                  <div className="text-2xl font-black text-white">Back</div>
                </Link>
              </div>

              <div className="text-center mb-2">
                <div className="text-2xl font-black tracking-wider bg-gradient-to-b from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
                  VOID REAPER
                </div>

                <p className="text-[11px] italic text-violet-300/80 tracking-wide">
                  Herald of the Endless Dark
                </p>
              </div>

              <div className="relative flex-shrink-0 h-[165px] rounded-xl overflow-hidden border border-violet-500/30">

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 165">

                  <defs>
                    <radialGradient id="aura" cx="50%" cy="50%" r="45%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <ellipse
                    cx="100"
                    cy="90"
                    rx="60"
                    ry="55"
                    fill="url(#aura)"
                    className="animate-pulse"
                  />

                  <circle cx="65" cy="95" r="10" fill="#7c3aed" />
                  <circle cx="65" cy="95" r="6" fill="#a78bfa" />

                  <text
                    x="40"
                    y="45"
                    fill="#a78bfa"
                    fontSize="14"
                    opacity="0.8"
                  >
                    ᛟ
                  </text>

                </svg>
              </div>

              <div className="my-2 py-1.5 rounded-full bg-gradient-to-r from-transparent via-violet-900/50 to-transparent border-y border-violet-600/20">
                <p className="text-[10px] text-center text-violet-200/90 tracking-[3px] font-medium">
                  CREATURE — SPECTER HORROR
                </p>
              </div>

              <div className="flex-1 rounded-lg bg-gradient-to-b from-slate-900/80 via-violet-950/60 to-slate-900/90 border border-violet-700/20 p-3">

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-violet-800/60 text-[9px] text-violet-200 font-semibold">
                    DEATHTOUCH
                  </span>

                  <span className="px-2 py-0.5 rounded-full bg-slate-800/60 text-[9px] text-slate-300 font-semibold">
                    FLYING
                  </span>
                </div>

                <p className="text-[11px] text-violet-100 mb-2">
                  <span className="text-pink-400 font-bold italic">
                    Reap Soul
                  </span>{" "}
                  — Combat damage exiles target creature.
                </p>

                <p className="text-[10px] italic text-violet-400/60 border-t border-violet-700/20 pt-2">
                  "The void simply... consumes."
                </p>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}

export default UserInfos;