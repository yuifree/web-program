import React, { useRef, useEffect } from "react";

export default function DiceCanvas({ rollValue, rolling }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawDice = (tens, ones) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = "50px monospace";
      ctx.fillStyle = "#2ecc71";
      ctx.textAlign = "left";
      ctx.fillText(tens.toString().padStart(2, "0"), 30, canvas.height / 2 + 40);
      ctx.fillText(ones, 100, canvas.height / 2 + 40);

      const finalValue = tens + ones;
      if (finalValue >= 1 && finalValue <= 5) {
        ctx.font = "25px sans-serif";
        ctx.fillStyle = "#e74c3c";
        ctx.textAlign = "center";
        ctx.fillText("Critical!", canvas.width / 2, 40);
      } else if (finalValue >= 96 && finalValue <= 100) {
        ctx.font = "25px sans-serif";
        ctx.fillStyle = "#f39c12";
        ctx.textAlign = "center";
        ctx.fillText("Fumble!", canvas.width / 2, 40);
      }
    };

    if (rolling) {
      let count = 0;
      const interval = setInterval(() => {
        const tens = Math.floor(Math.random() * 10) * 10;
        const ones = Math.floor(Math.random() * 10);
        drawDice(tens, ones);
        count++;
        if (count > 10) clearInterval(interval);
      }, 50);
    } else if (rollValue != null) {
      const tens = Math.floor(rollValue / 10) * 10;
      const ones = rollValue % 10;
      drawDice(tens, ones);
    }
  }, [rollValue, rolling]);

  return (
    <canvas
      ref={canvasRef}
      width={150}
      height={150} 
      style={{
        border: "2px solid #333",
        borderRadius: "10px",
        background: "#f5f5f5",
      }}
    />
  );
}
