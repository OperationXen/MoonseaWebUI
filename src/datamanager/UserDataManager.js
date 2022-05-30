import { useEffect } from "react";

import userStore from "../datastore/user";
import { getUserDetails } from "../api/user";

export default function UserDataManager() {
  const [setUsername, setUserID, setDMID] = userStore((s) => [
    s.setUsername,
    s.setUserID,
    s.setDMID,
  ]);

  // Get user details on application load
  useEffect(() => {
    getUserDetails().then((response) => {
      debugger;
      setUsername(response.data.username);
      setUserID(response.data.uuid);
      setDMID(response.data.dmID);
    });
  }, [setUsername, setUserID, setDMID]);

  return null;
}
