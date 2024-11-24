import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CssBaseline } from "@mui/material";

import DungeonMasterWindow from "./components/dungeonmaster/DungeonMasterWindow";
import MagicItemDetails from "./components/items/details/MagicItemDetails";
import TradingPostWindow from "./components/trading/TradingPostWindow";
import ItemVaultWindow from "./app/itemvault/page";
import FeedbackBar from "./components/general/FeedbackBar";
import Dashboard from "./components/dashboard/Dashboard";
import Titlebar from "./components/general/Titlebar";
import DataManager from "./datamanager/DataManager";

import RegistrationWindow from "./components/user/RegistrationWindow";
import ForgotPassword from "./components/user/ForgotPassword";
import PasswordReset from "./components/user/PasswordReset";
import LoginWindow from "./components/user/LoginWindow";

import userStore from "./datastore/user";

const queryClient = new QueryClient();

export default function App() {
  const authenticated = userStore((s) => s.authenticated);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline>
          <Titlebar />
          <Routes>
            {(!authenticated && (
              <React.Fragment>
                <Route path="/login" element={<LoginWindow />} />
                <Route path="/register" element={<RegistrationWindow />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/passwordreset/:userID/:token" element={<PasswordReset />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </React.Fragment>
            )) || <React.Fragment></React.Fragment>}
            <Route path="/tradingpost/" element={<TradingPostWindow />} />
            <Route path="/tradingpost/:section" element={<TradingPostWindow />} />
            <Route path="/magicitem/:uuid" element={<MagicItemDetails />} />

            <Route path="/dungeonmaster/:uuid" element={<DungeonMasterWindow />} />
          </Routes>
        </CssBaseline>
        <FeedbackBar />
        <DataManager />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
