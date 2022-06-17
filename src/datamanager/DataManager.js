import React from "react";

import UserDataManager from "./UserDataManager";
import CharacterDataManager from "./CharacterDataManager";

export default function DataManager() {
  return (
    <React.Fragment>
      <UserDataManager />
      <CharacterDataManager />
    </React.Fragment>
  );
}
