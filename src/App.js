import { BrowserRouter, Routes, Route } from "react-router-dom";

import CharacterDetailWindow from "./components/characters/CharacterDetailWindow";
import DungeonMasterWindow from "./components/dungeonmaster/DungeonMasterWindow";
import FeedbackBar from "./components/general/FeedbackBar";
import Dashboard from "./components/dashboard/Dashboard";
import Titlebar from "./components/general/Titlebar";

export default function App() {
  return (
    <BrowserRouter>
      <Titlebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/character/:id" element={<CharacterDetailWindow />} />
        <Route path="/dungeonmaster" element={<DungeonMasterWindow />} />
      </Routes>
      <FeedbackBar />
    </BrowserRouter>
  );
}
