import React, { useState } from "react";
import DiceCanvas from "./DiceCanvas.jsx";
import diceSound from "../assets/dice-roll.mp3";

export default function SingleMode() {
  const [rolls, setRolls] = useState([]);
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    const audio = new Audio(diceSound);
    audio.play();

    setRolling(true);
    setTimeout(() => {
      const newRoll = Math.floor(Math.random() * 100) + 1;
      setRolls((prev) => [newRoll, ...prev].slice(0, 10));
      setRolling(false);
    }, 600);
  };

  return (
    <div className="mode">
      <h2>Single Mode</h2>
      <DiceCanvas rollValue={rolls[0]} rolling={rolling} />
      <button onClick={handleRoll} disabled={rolling}>Roll Dice</button>
      <p>Recent Rolls: {rolls.join(", ")}</p>
    </div>
  );
}
