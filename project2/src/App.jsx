import { useState, useEffect } from 'react';
import './App.css';
import Cat from "./Cat.jsx";

import CatOneF1 from "./assets/basic-cat-1.png";
import CatOneF2 from "./assets/basic-cat-2.png";

const CLIENT_ID = "252a84a890044ce4ab4ba5aef17913e1";
const CLIENT_SECRET = "cddf795f75884c5ea515b37de823639a";

export default function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() =>{
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
  <div>
  <h1>beats and cats !</h1>
  <Cat imgSrc1={ CatOneF1 } imgSrc2 = { CatOneF2 } access = {accessToken} />
  </div>
  );
  }

  