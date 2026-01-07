import { useState } from "react";

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function App() {
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

  function handleSubmit(event) {
    event.preventDefault();
    const guessField = event.target.elements.guessField;
    const newUserGuess = Number(guessField.value);
    setPreviousGuesses([].concat(previousGuesses, [newUserGuess]));
    guessField.value = "";
    guessField.focus();
  }

  function handleClickResetButton() {
    setPreviousGuesses([]);
    setRandomNumber(generateRandomNumber());
  }

  const guessCount = previousGuesses.length;
  const userGuess = guessCount === 0 ? null : previousGuesses[guessCount - 1];
  const gameClear = userGuess === randomNumber;
  const gameOver = guessCount === 10;
  const gameFinished = gameClear || gameOver;

  let lastResultMessage = "Wrong!";
  if (gameClear) {
    lastResultMessage = "Congratulations! You got it right!";
  } else if (gameOver) {
    lastResultMessage = "!!!GAME OVER!!!";
  }
  let lastResultColor = "";
  if (gameClear) {
    lastResultColor = "green";
  } else if (userGuess != null) {
    lastResultColor = "red";
  }

  return (
    <>
      <h1>Number guessing game</h1>

      <p>
        We have selected a random number between 1 and 100. See if you can guess
        it in 10 turns or fewer. We'll tell you if your guess was too high or
        too low.
      </p>

      <div class="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="guessField">Enter a guess: </label>
          <input
            type="number"
            min="1"
            max="100"
            required
            name="guessField"
            class="guessField"
            disabled={gameFinished}
          />
          <input
            type="submit"
            value="Submit guess"
            class="guessSubmit"
            disabled={gameFinished}
          />
        </form>
      </div>

      {userGuess != null && (
        <div class="resultParas">
          <p class="guesses">{previousGuesses.join(" ")}</p>
          <p class="lastResult" style={{ backgroundColor: lastResultColor }}>
            {lastResultMessage}
          </p>
          {userGuess !== randomNumber && (
            <p class="lowOrHi">
              {userGuess < randomNumber
                ? "Last guess was too low!"
                : "Last guess was too high!"}
            </p>
          )}
        </div>
      )}

      {gameFinished && (
        <button onClick={handleClickResetButton}>Start new game</button>
      )}
    </>
  );
}