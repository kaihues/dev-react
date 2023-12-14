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

import Title from "./assets/title.png";

const playlistID_1 = '37i9dQZF1DXasneILDRM7B'; // "Pure Pop Punk"
const playlistID_2 = '37i9dQZF1EId3k9ylpDgha'; // "Midwest Emo Mix"
const playlistID_3 = '37i9dQZF1EIgBrmye0h40Y'; // "Cozy Indie Mix"
const playlistID_4 = '37i9dQZF1DWZCkamcYMQkz'; // "Feel Good Jazz"

// const playlist1 = '37i9dQZF1DX9wa6XirBPv8';

const siteTitle = "Beats n' Cats";

export default function App() {
  const [accessToken, setToken] = useState(''); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ playlist, setPlaylist ] = useState(null);
  const [ catSong, UpdateCatSong ] = useState(null);
  const [ trackNum, updateTrackNum ] = useState(0);

  useEffect(() => {
    const fetchToken = async () => {
      const client_id = CLIENT_ID;
      const client_secret = CLIENT_SECRET;

      const authOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      };

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', authOptions);

        if (response.ok) {
          const data = await response.json();
          const accessToken = data.access_token;
          setToken(accessToken);
          console.log(accessToken);
          await fetchPlaylist(accessToken, playlistID_1);
        } else {
          console.error('Error fetching token:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();

     
  }, [playlistID_1]);

  async function fetchPlaylist(accessToken) {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID_1}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });

      if (response.ok) {
        const playlistData = await response.json();
        console.log('Playlist data:', playlistData);
      } else {
        console.error('Error fetching playlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  }

    // var playlistParameters = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + access
    //   }
    // }
    // load each playlist as state object
    // fetch('https://api.spotify.com/v1/playlists/' + playlistID, playlistParameters)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     setPlaylist(data.tracks.items);
    //     let n = 0;
    //     while (catSong == null) {
    //       n = Math.floor(Math.random() * data.tracks.total);
    //       let song = data.tracks.items[n].track.preview_url;
    //       UpdateCatSong(song);
    //     }
    //     updateTrackNum(n);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

  // return (
  // <div class = "FullApp">
  //   <img class = "Title" src= { Title } />
  //   <ul class = "CatList">
  //     <li><Cat imgSrc1={ CatOneF1 } imgSrc2 = { CatOneF2 } audioSrc = { null } /></li>
  //     <li><Cat imgSrc1={ CatTwoF1 } imgSrc2 = { CatTwoF2 } audioSrc = { null } /></li>
  //     <li><Cat imgSrc1={ CatThreeF1 } imgSrc2 = { CatThreeF2 } audioSrc = { null } /></li>
  //     <li><Cat imgSrc1={ CatFourF1 } imgSrc2 = { CatFourF2 } audioSrc = { null } /></li>
  //   </ul>
  // </div>
  // );

  return (
    <div class = "FullApp">
      <img class = "Title" src= { Title } />
      <ul class = "CatList">
        <li><Cat imgSrc1={ CatOneF1 } imgSrc2 = { CatOneF2 } audioSrc = { null } /></li>
        <li><Cat imgSrc1={ CatTwoF1 } imgSrc2 = { CatTwoF2 } audioSrc = { null } /></li>
        <li><Cat imgSrc1={ CatThreeF1 } imgSrc2 = { CatThreeF2 } audioSrc = { null } /></li>
        <li><Cat imgSrc1={ CatFourF1 } imgSrc2 = { CatFourF2 } audioSrc = { null } /></li>
      </ul>
    </div>
    );
  }

  