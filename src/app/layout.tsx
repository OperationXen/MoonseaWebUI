import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moonsea Codex",
  description: "An adventurers league character journal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
