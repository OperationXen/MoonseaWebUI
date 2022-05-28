import { BrowserRouter, Routes, Route } from "react-router-dom";

import CharacterDetailWindow from "./components/characters/CharacterDetailWindow";
import DungeonMasterWindow from "./components/dungeonmaster/DungeonMasterWindow";
import ItemVaultWindow from "./components/items/ItemVaultWindow";
import FeedbackBar from "./components/general/FeedbackBar";
import Dashboard from "./components/dashboard/Dashboard";
import Titlebar from "./components/general/Titlebar";

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Titlebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/character/:id" element={<CharacterDetailWindow />} />
        <Route path="/dungeonmaster" element={<DungeonMasterWindow />} />
        <Route path="/itemvault" element={<ItemVaultWindow />} />
      </Routes>
      <FeedbackBar />
    </BrowserRouter>
  );
}
