"use client";
import Image from "next/image";
import { useWallet } from "../WalletContext";

export default function Navbar() {
  const { walletAddress, connectWalletHandler } = useWallet();

  return (
    <nav className="navbar">
      <div className="logo">
        <Image src="/logo.png" alt="Logo" width={100} height={40} />
      </div>
      <button className="wallet-btn" onClick={connectWalletHandler}>
        {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
      </button>
    </nav>
  );
}
