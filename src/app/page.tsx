"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./components/navbar";
import gameIcon from "../../public/game-icon.png";
import "./styles.css";
import Hole from "../../public/aset2.png";
import Mole from "../../public/aset1.png";
import { useWallet } from "./WalletContext";// Import your sound file
import CustomDropdown from "./components/CustomDropdown"


export default function Home() {
  
  const [selectedCurrency, setSelectedCurrency] = useState("ETH");


  const { walletAddress, connectWalletHandler } = useWallet();
  const [showModal, setShowModal] = useState(false);

  const handleGameIconClick = async () => {
    if (!walletAddress) {
      await connectWalletHandler();
    }
    if (walletAddress) {
      setShowModal(true);
    }
  };

  const [showBox, setShowBox] = useState(false);

  // 2) Submitting form -> close modal, show box
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
    setShowBox(true);
  };

  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  function setMoleVisibility(index: number, isVisible: boolean){
    setMoles(curMoles => {
      const newMoles = [...curMoles];
      newMoles[index] = isVisible;
      return newMoles;
    });
  }

  function wackMole(index: number){
    if(!moles[index]) return;
    
    // Play click sound effect
    const wackSound = new Audio("/wack.mp3");
    wackSound.play();

    setMoleVisibility(index, false);
    setScore((score) => score+1);
  }

  useEffect(() => {
    const interval = setInterval(()=>{
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoleVisibility(randomIndex, true);
      setTimeout(() => {
        setMoleVisibility(randomIndex, false)
      }, 800)
    }, 1000);

    return () => {
      clearInterval(interval);
    };

  }, [moles]);

  return (
    <div>
      <Navbar />
      <h1 className="score-text">Score</h1>
      <h1 className="score-text">{score}</h1>
      <div className="horizontal-center">
        {/* Show the image button if showBox is false */}
        {!showBox && (
          <Image
            src={gameIcon}
            alt="Game Icon"
            className="game-icon"
            width={150}
            height={150}
            onClick={handleGameIconClick}
            style={{ cursor: "pointer" }}
          />
        )}
        
        {/* Show the box if showBox is true */}
        {showBox && (
          <div className="grid">
            {moles.map((isMole , idx) => (
              <Image 
                src={isMole ? Mole : Hole} 
                alt="Hole" 
                className="hole"
                key={idx}
              onClick={() => {
                wackMole(idx);
              }}
              />
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-headers">READY TO PLAY ???</h3>
              <form onSubmit={handleFormSubmit}>
                <h3>Choose Token</h3>
                <CustomDropdown
                    options={["ETH", "USDT", "BTC"]}
                    selected={selectedCurrency}
                    setSelected={setSelectedCurrency}
                  />
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
