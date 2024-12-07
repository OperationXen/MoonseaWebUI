import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CssBaseline } from "@mui/material";

import DungeonMasterWindow from "./components/dungeonmaster/DungeonMasterWindow";
import MagicItemDetails from "./components/items/details/MagicItemDetails";

import Dashboard from "./components/dashboard/Dashboard";
import DataManager from "./datamanager/DataManager";

import RegistrationWindow from "./app/auth/register/page.tsx";
import ForgotPassword from "./app/auth/passwordreset/page.js";
import PasswordReset from "./app/auth/passwordreset/[userID]/[token]/page.js";
import LoginWindow from "./app/auth/login/page";

import userStore from "./datastore/user";

const queryClient = new QueryClient();

export default function App() {
  const authenticated = userStore((s) => s.authenticated);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline>
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

            <Route path="/magicitem/:uuid" element={<MagicItemDetails />} />

            <Route path="/dungeonmaster/:uuid" element={<DungeonMasterWindow />} />
          </Routes>
        </CssBaseline>
        <DataManager />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
