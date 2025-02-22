"use client";
import { useState } from "react";
import { connectWallet } from "@/utils/connectWallet";
import Image from "next/image";

export default function Navbar() {
  
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    const account = await connectWallet();
    setWalletAddress(account);
  };
  
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Image src="/logo.png" alt="Logo" width={100} height={40} />
      </div>
      {/* Navigation Buttons */}
      <button className="wallet-btn" onClick={handleConnect}>
        {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
      </button>
    </nav>
  );
}
