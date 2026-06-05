import "./globals.css";
import Nabvar from "../src/components/nabvar";

export const metadata = {
  title: "Swiggy Food App",
  description: "Next.js + Node.js + MySQL food delivery application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nabvar />
        {children}
      </body>
    </html>
  );
}
