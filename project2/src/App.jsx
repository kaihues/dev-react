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

const playlistID_1 = '37i9dQZF1DXasneILDRM7B';
const playlistID_2 = '37i9dQZF1EId3k9ylpDgha';
const playlistID_3 = '37i9dQZF1EIgBrmye0h40Y';
const playlistID_4 = '37i9dQZF1DWZCkamcYMQkz';

export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [playlist1, setPlaylist1] = useState(null);
  const [playlist2, setPlaylist2] = useState(null);
  const [playlist3, setPlaylist3] = useState(null);
  const [playlist4, setPlaylist4] = useState(null); 

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
    .then(console.log("successful request"))
    .catch((error) => {
      console.log(error)
    })

    var playlistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    // load each playlist as state object
    fetch('https://api.spotify.com/v1/playlists/' + playlistID_1, playlistParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPlaylist1(data.tracks.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetch('https://api.spotify.com/v1/playlists/' + playlistID_2, playlistParameters) 
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPlaylist2(data.tracks.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetch('https://api.spotify.com/v1/playlists/' + playlistID_3, playlistParameters) 
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPlaylist3(data.tracks.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetch('https://api.spotify.com/v1/playlists/' + playlistID_4, playlistParameters) 
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPlaylist4(data.tracks.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
  <div class = "fullApp">
  <h1>beats and cats !</h1>
  <Cat imgSrc1={ CatOneF1 } imgSrc2 = { CatOneF2 } playlist = { playlist1 } />
  <Cat imgSrc1={ CatTwoF1 } imgSrc2 = { CatTwoF2 } playlist = { playlist2 } />
  <Cat imgSrc1={ CatThreeF1 } imgSrc2 = { CatThreeF2 } playlist = { playlist3 } />
  <Cat imgSrc1={ CatFourF1 } imgSrc2 = { CatFourF2 } playlist = { playlist4 } />
  </div>
  );
  }

  