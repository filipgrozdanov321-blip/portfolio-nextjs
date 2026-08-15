import "./globals.css";
import ScrollManager from "./ScrollManager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
