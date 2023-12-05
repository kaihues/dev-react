import { useState, useEffect } from 'react';
import './App.css';
import Cat from "./Cat.jsx";

import CatOneF1 from "./assets/basic-cat-1.png";
import CatOneF2 from "./assets/basic-cat-2.png";
import CatOneAudio from "./assets/meow.wav"

let CatOneText = "yeah";

const CLIENT_ID = "252a84a890044ce4ab4ba5aef17913e1";
const CLIENT_SECRET = "cddf795f75884c5ea515b37de823639a";
const SAMPLE_PLAYLIST_ID = '37i9dQZF1DX9wa6XirBPv8'

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
    fetch('https://acounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  return (
  <div>
  <h1>beats and cats !</h1>
  <Cat imgSrc1={ CatOneF1 } imgSrc2 = { CatOneF2 } catAudio = { CatOneAudio } text = { CatOneText } />
  </div>
  );
  }

  async function getSong() {
    var playlistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    // choose which playlist to use
    var playlistID = await fetch('https://api.spotify.com/v1/playlists/' + SAMPLE_PLAYLIST_ID, playlistParameters)
      .then(response => response.json())
      .then(data => console.log(data))



  }

  