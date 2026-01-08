import React, { useState } from "react";
import DiceCanvas from "./DiceCanvas.jsx";

export default function SingleMode() {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("diceHistory")) || []
  );
  const [rollValue, setRollValue] = useState(null);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);

    const audio = new Audio("/src/assets/dice-roll.mp3");
    audio.play();

    if (navigator.vibrate) navigator.vibrate(200);

    setTimeout(() => {
      const roll = Math.floor(Math.random() * 100) + 1;
      setRollValue(roll);
      const newHistory = [roll, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("diceHistory", JSON.stringify(newHistory));
      setRolling(false);
    }, 600);
  };

  return (
    <div className="single-mode">
      <h2>Single Mode</h2>
      <DiceCanvas rollValue={rollValue} rolling={rolling} />
      <button onClick={rollDice} disabled={rolling}>Roll 1d100</button>
      {rollValue && <p>Roll: {rollValue}</p>}
      <p className="history">History: {history.join(", ")}</p>
    </div>
  );
}
