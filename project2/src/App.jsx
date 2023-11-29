import { useState } from 'react';
import './App.css';
import Cat from "./Cat.jsx";

import CatOneF1 from "./assets/basic-cat-1.png";
import CatOneF2 from "./assets/basic-cat-2.png";
import CatOneAudio from "./assets/meow.wav"

let CatOneText = "yeah";

export default function App() {
  return (
  <div>
  <h1>beats and cats !</h1>
  <Cat imgSrc1={ CatOneF1 } imgSrc2 = { CatOneF2 } catAudio = { CatOneAudio } text = { CatOneText } />
  </div>
  );
  }
  