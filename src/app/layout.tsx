import type { Metadata } from "next";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Moonsea Codex",
  description: "An adventurers league character journal from Triden games",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <div id="root">{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
