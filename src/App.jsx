import Users from "./pages/Users";
import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";
import Heros from "./pages/Heros"
import UserInfos from "./pages/UserInfos"
import Live from "./pages/Live"
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";
import Leagues from "./pages/Leagues";
import HerosPage from "./heroes/HerosPage";
import ProPLayers from "./pages/ProPLayers";
import TeamsInfo from "./pages/TeamsInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/users" element={<Users />} />
      <Route path="/teamsinfo" element={<TeamsInfo />} />
      <Route path="/proplayers" element={<ProPLayers />} />
      <Route path="/main" element={<Main />} />
      <Route path="/heros" element={<Heros />} />
      <Route path="/userinfos" element={<UserInfos />} />
      <Route path="/live" element={<Live />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/leagues" element={<Leagues />} />
      <Route path="/heropage/:id" element={<HerosPage />} />
    </Routes>
  );
}

export default App;
