"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./components/navbar";
import gameIcon from "../../public/game-icon.png";
import "./styles.css";
import Hole from "../../public/hole2.png";
import Mole from "../../public/mole2.png";

export default function Home() {
  const [showBox, setShowBox] = useState(false);

  const handleImageClick = () => {
    setShowBox(true); // Switch from the image to the box
  };


  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  useEffect(() => {
    const interval = setInterval(()=>{
      const randomIndex = Math.floor(Math.random() * moles.length);
      const newMoles = [...moles];
      newMoles[randomIndex] = true;
      setMoles(newMoles);
    }, 1000);

    return () => {
      clearInterval(interval);
    };

  }, []);

  function wackMole(index: number){
      const newMoles = [...moles];
      newMoles[index] = false;
      setScore(score +  1)
      setMoles(newMoles);
  }

  return (
    <div>
      <Navbar />
      <h1>Score {score}</h1>
      <div className="horizontal-center">
        {/* Show the image button if showBox is false */}
        {!showBox && (
          <Image
            src={gameIcon}
            alt="Game Icon"
            className="game-icon"
            width={150}
            height={150}
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
        )}

        
        {/* Show the box if showBox is true */}
        {showBox && (
          <div className="grid">
            {moles.map((isMole , idx) => (
              <Image src={isMole ? Mole : Hole} alt="Hole" className="hole"
              
              onClick={() => {
                wackMole(idx);
              }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
