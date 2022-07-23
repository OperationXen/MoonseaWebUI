import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CharacterDetailWindow from "./components/characters/CharacterDetailWindow";
import DungeonMasterWindow from "./components/dungeonmaster/DungeonMasterWindow";
import ItemVaultWindow from "./components/items/ItemVaultWindow";
import FeedbackBar from "./components/general/FeedbackBar";
import Dashboard from "./components/dashboard/Dashboard";
import Titlebar from "./components/general/Titlebar";
import DataManager from "./datamanager/DataManager";

import RegistrationWindow from "./components/user/RegistrationWindow";
import ForgotPassword from "./components/user/ForgotPassword";
import PasswordReset from "./components/user/PasswordReset";
import LoginWindow from "./components/user/LoginWindow";

import userStore from "./datastore/user";

export default function App() {
  const authenticated = userStore((s) => s.authenticated);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Titlebar />
      <Routes>
        {(!authenticated && (
          <React.Fragment>
            <Route path="/login" element={<LoginWindow />} />
            <Route path="/register" element={<RegistrationWindow />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/passwordreset/:userID/:token"
              element={<PasswordReset />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </React.Fragment>
        )) || (
          <React.Fragment>
            <Route path="/" element={<Dashboard />} />
            <Route path="/itemvault" element={<ItemVaultWindow />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </React.Fragment>
        )}
        <Route path="/character/:uuid" element={<CharacterDetailWindow />} />
        <Route path="/dungeonmaster/:uuid" element={<DungeonMasterWindow />} />
      </Routes>
      <FeedbackBar />
      <DataManager />
    </BrowserRouter>
  );
}
