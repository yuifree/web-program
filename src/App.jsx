import React, { useState } from "react";
import Header from "./components/Header.jsx";
import SingleMode from "./components/SingleMode.jsx";
import DuelMode from "./components/DuelMode.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [mode, setMode] = useState("single"); // single or duel

  return (
    <>
      <Header onChangeMode={setMode} />
      {mode === "single" ? <SingleMode /> : <DuelMode />}
      <Footer />
    </>
  );
}