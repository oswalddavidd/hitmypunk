import { Montserrat } from "next/font/google";
import { WalletProvider } from "./WalletContext";
import { Wallet } from "ethers";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="antialiased font-montserrat">
        <WalletProvider>
        <Toaster position="top-center" reverseOrder={false} />
          {children}
        </WalletProvider></body>
    </html>
  );
}
