import React from "react";

import UserDataManager from "./UserDataManager";
import PlayerDataManager from "./PlayerDataManager";

export default function DataManager() {
  return (
    <React.Fragment>
      <UserDataManager />
      <PlayerDataManager />
    </React.Fragment>
  );
}
