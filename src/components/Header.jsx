import React from "react";

export default function Header({ onChangeMode }) {
  return (
    <header>
      <h1>1d100 Dice Game</h1>
      <div>
        <button onClick={() => onChangeMode("single")}>Single Mode</button>
        <button onClick={() => onChangeMode("duel")}>Duel Mode</button>
      </div>
    </header>
  );
}