import { useState, useEffect } from 'react';
import './App.css';
import Cat from "./Cat.jsx";
import { CLIENT_ID, CLIENT_SECRET } from "./Keys.jsx";

import CatOneF1 from "./assets/calico-1.png";
import CatOneF2 from "./assets/calico-2.png";

import CatTwoF1 from "./assets/tux-1.png";
import CatTwoF2 from "./assets/tux-2.png";

import CatThreeF1 from "./assets/stripes-1.png";
import CatThreeF2 from "./assets/stripes-2.png";

import CatFourF1 from "./assets/sia-1.png";
import CatFourF2 from "./assets/sia-2.png";

const playlist1 = '37i9dQZF1DX9wa6XirBPv8';

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
  <div class = "fullApp">
  <h1>beats and cats !</h1>
  <Cat imgSrc1={ CatOneF1 } imgSrc2 = { CatOneF2 } access = { accessToken } playlistId = { playlist1 } />
  <Cat imgSrc1={ CatTwoF1 } imgSrc2 = { CatTwoF2 } access = { accessToken } playlistId = { playlist1 } />
  <Cat imgSrc1={ CatThreeF1 } imgSrc2 = { CatThreeF2 } access = { accessToken } playlistId = { playlist1 } />
  <Cat imgSrc1={ CatFourF1 } imgSrc2 = { CatFourF2 } access = { accessToken } playlistId = { playlist1 } />
  </div>
  );
  }

  