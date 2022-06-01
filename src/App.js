import { BrowserRouter, Routes, Route } from "react-router-dom";

import CharacterDetailWindow from "./components/characters/CharacterDetailWindow";
import DungeonMasterWindow from "./components/dungeonmaster/DungeonMasterWindow";
import RegistrationWindow from "./components/user/RegistrationWindow";
import ItemVaultWindow from "./components/items/ItemVaultWindow";
import FeedbackBar from "./components/general/FeedbackBar";
import Dashboard from "./components/dashboard/Dashboard";
import LoginWindow from "./components/user/LoginWindow";
import Titlebar from "./components/general/Titlebar";
import DataManager from "./datamanager/DataManager";

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Titlebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginWindow />} />
        <Route path="/register" element={<RegistrationWindow />} />
        <Route path="/character/:id" element={<CharacterDetailWindow />} />
        <Route path="/dungeonmaster/:id" element={<DungeonMasterWindow />} />
        <Route path="/itemvault" element={<ItemVaultWindow />} />
      </Routes>
      <FeedbackBar />
      <DataManager />
    </BrowserRouter>
  );
}
