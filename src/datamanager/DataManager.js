import { useState, useEffect } from "react";

import userStore from "../datastore/user";

export default function DataManager() {
  const [setUsername, setUserID, setDMID] = userStore((s) => [
    s.setUsername,
    s.setUserID,
    s.setDMID,
  ]);

  useEffect(() => {
    getUserDetails().then((response) => {
      debugger;
      setUsername(response.data.username);
      setUserID(response.data.uuid);
      setDMID(response.data.dmID);
    });
  }, []);

  return null;
}
