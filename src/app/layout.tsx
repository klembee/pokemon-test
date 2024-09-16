import type { PropsWithChildren } from "react";

import "./ui/globals.css";
import { inter } from "./ui/fonts";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
