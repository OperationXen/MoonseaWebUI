import { BrowserRouter, Routes, Route } from "react-router-dom";

import CharacterDetailWindow from "./components/characters/CharacterDetailWindow";
import FeedbackBar from "./components/general/FeedbackBar";
import Dashboard from "./components/dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/character/:id" element={<CharacterDetailWindow />} />
      </Routes>
      <FeedbackBar />
    </BrowserRouter>
  );
}
