import { ethers } from "ethers";

export const connectWallet = async () => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      return accounts[0]; // Returns the connected wallet address
    } catch (error) {
      console.error("User denied account access", error);
      return null;
    }
  } else {
    alert("MetaMask is not installed. Please install it.");
    return null;
  }
};
