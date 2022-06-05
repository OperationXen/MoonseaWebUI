import { useEffect, useCallback } from "react";

import userStore from "../datastore/user";
import { getUserDetails } from "../api/user";

export default function UserDataManager() {
  const refreshUserData = userStore((s) => s.refresh);

  const refreshUserDetails = useCallback(() => {
    getUserDetails().then((response) => {
      userStore.setState({
        authenticated: true,
        username: response.data.username,
        email: response.data.email,
        discordID: response.data.discord_id,
        dmUUID: response.data.dm_info[0].uuid,
        dmHours: response.data.dm_info[0].hours,
      });
    });
  }, []);

  // Get user details on application load
  useEffect(() => {
    refreshUserDetails();
  }, [refreshUserDetails, refreshUserData]);

  return null;
}
