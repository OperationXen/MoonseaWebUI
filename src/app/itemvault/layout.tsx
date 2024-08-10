import React from "react";

import Titlebar from "components/general/Titlebar";

export default function ItemVaultLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Titlebar />
      {children}
    </React.Fragment>
  );
}
