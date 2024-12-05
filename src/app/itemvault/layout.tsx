import React from "react";

export default function ItemVaultLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <React.Fragment>{children}</React.Fragment>;
}
