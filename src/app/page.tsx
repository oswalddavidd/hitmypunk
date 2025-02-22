import Image from "next/image";
import Navbar from "./components/navbar";
import gameIcon from "../../public/game-icon.png"; // Ensure the image is in the correct path
import "./styles.css"; // Import CSS

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="horizontal-center">
        <Image src={gameIcon} alt="Game Icon" className="game-icon" width={150} height={150} />
      </div>
    </div>
  );
}
