"use client";
import { createContext, useState, useContext } from "react";
import { connectWallet } from "@/utils/connectWallet";
import toast, { Toaster } from 'react-hot-toast' ;

interface WalletContextType {
  walletAddress: string | null;
  connectWalletHandler: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWalletHandler = async () => {
    const account = await connectWallet();
    if (account) {
      setWalletAddress(account);
      toast.success("Wallet successfully connected! Please click Play Now again.");
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWalletHandler }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within Wallet Provider");
  return context;
}
