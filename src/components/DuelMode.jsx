import React, { useState, useEffect } from "react";
import DiceCanvas from "./DiceCanvas.jsx";
import diceSound from "../assets/dice-roll.mp3";

export default function DuelMode() {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(1); 
  const [rolling, setRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(null); 

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 100) + 1;
    setCurrentRoll(roll); 
    setRolling(true);

    const audio = new Audio(diceSound);
    audio.play();

    setTimeout(() => {
      if (turn === 1) setPlayer1(roll);
      else if (turn === 2) setPlayer2(roll);

      if (turn === 1) setTurn(2);
      else setTurn(null); 

      setRolling(false);
    }, 600);
  };

  useEffect(() => {
    if (player1 != null && player2 != null) {
      if (player1 < player2) setWinner("Player 1 wins!");
      else if (player1 > player2) setWinner("Player 2 wins!");
      else setWinner("Draw!");
    }
  }, [player1, player2]);

  const resetGame = () => {
    setPlayer1(null);
    setPlayer2(null);
    setWinner(null);
    setTurn(1);
    setCurrentRoll(null);
  };

  return (
    <div className="duel-mode">
      <h2>Duel Mode</h2>
      <p>
        Current Turn:{" "}
        {turn === 1 ? "Player 1" : turn === 2 ? "Player 2" : "Result"}
      </p>

      <DiceCanvas rollValue={currentRoll} rolling={rolling} />

      <button onClick={rollDice} disabled={rolling || turn == null}>
        Roll Dice
      </button>

      <div>
        <p>Player 1: {player1 != null ? player1 : "-"}</p>
        <p>Player 2: {player2 != null ? player2 : "-"}</p>
      </div>

      {winner && (
        <>
          <p className="winner">{winner}</p>
          <button onClick={resetGame}>Reset</button>
        </>
      )}
    </div>
  );
}
