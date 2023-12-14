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

const siteTitle = "Beats n' Cats";

export default function App() {
  const [accessToken, setToken] = useState(''); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ playlist1, setPlaylist1 ] = useState(null);
  const [ playlist2, setPlaylist2 ] = useState(null);
  const [ playlist3, setPlaylist3 ] = useState(null);
  const [ playlist4, setPlaylist4 ] = useState(null);

  const [ catSong1, updateCatSong1 ] = useState(null);
  const [ catSong2, updateCatSong2 ] = useState(null);
  const [ catSong3, updateCatSong3 ] = useState(null);
  const [ catSong4, updateCatSong4 ] = useState(null);

  const [ trackNum1, updateTrackNum1 ] = useState(0);
  const [ trackNum2, updateTrackNum2 ] = useState(0);
  const [ trackNum3, updateTrackNum3 ] = useState(0);
  const [ trackNum4, updateTrackNum4 ] = useState(0);

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
          //console.log(accessToken);
          try {
            const tracks1 = await fetchPlaylist(accessToken, playlistID_1);
            setPlaylist1(tracks1);
            if (playlist1) {
              console.log('Playlist 1 loaded:', playlist1);
            } else {
              console.error('Error loading playlist 1');
            }
            const tracks2 = await fetchPlaylist(accessToken, playlistID_2);
            setPlaylist2(tracks2);
            if (playlist2) {
              console.log('Playlist 2 loaded:', playlist2);
            } else {
              console.error('Error loading playlist 2');
            }
            const tracks3 = await fetchPlaylist(accessToken, playlistID_3);
            setPlaylist3(tracks3);
            if (playlist3) {
              console.log('Playlist 3 loaded:', playlist3);
            } else {
              console.error('Error loading playlist 3');
            }
            const tracks4 = await fetchPlaylist(accessToken, playlistID_4);
            setPlaylist4(tracks4);
            if (playlist4) {
              console.log('Playlist 4 loaded:', playlist4);
            } else {
              console.error('Error loading playlist 4');
            }
          } catch (error) {
            console.error('Error fetching playlists');
          }

          try {
            const track1 = getRandomN(playlist1);
            const prev1 = playlist1[track1].track.preview_url;
            updateTrackNum1(track1);
            updateCatSong1(prev1);
            if (catSong1) {
              console.log('Song 1 loaded:', catSong1);
            } else {
              console.log('Error loading song 1', track1, prev1);
            }
          } catch (error) {
            console.error('Error setting song 1');
          }
          try {
            const track2 = await getRandomN(playlist2);
            const prev2 = await playlist2[track2].track.preview_url;
            updateTrackNum2(track2);
            updateCatSong2(prev2);
            if (catSong2) {
              console.log('Song 2 loaded:', catSong2);
            } else {
              console.log('Error loading song 2', track2, prev2);
            }
          } catch (error) {
            console.error('Error setting song 2');
          }
          try {
            const track3 = await getRandomN(playlist3);
            const prev3 = await playlist3[track3].track.preview_url;
            updateTrackNum3(track3);
            updateCatSong3(prev3);
            if (catSong3) {
              console.log('Song 3 loaded:', catSong3);
            } else {
              console.log('Error loading song 3', track1, prev1);
            }
          } catch (error) {
            console.error('Error setting song 3');
          }
          try {
            const track4 = await getRandomN(playlist4);
            const prev4 = await playlist4[track4].track.preview_url;
            updateTrackNum4(track4);
            updateCatSong4(prev4);
            if (catSong4) {
              console.log('Song 4 loaded:', catSong4);
            } else {
              console.log('Error loading song 4', track4, prev4);
            }
          } catch (error) {
            console.error('Error setting song 4');
          }
        } else {
          console.error('Error fetching token:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();

     
  }, [playlistID_1, playlistID_2, playlistID_3, playlistID_4]);

  async function fetchPlaylist(accessToken, playlistID) {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });

      if (response.ok) {
        const playlistData = await response.json();
        console.log('Tracks:', playlistData.tracks.items);
        return playlistData.tracks.items;
      } else {
        console.error('Error fetching playlist:', response.statusText);
        return 0;
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return 0;
    }
  }

  async function getRandomN(playlist) {
    let n = Math.floor(Math.random() * playlist.length);
    let song = playlist[n].track.preview_url;
    while (song == null){
      if (n < playlist.length-1) {
        n = n+1;
      } else {
        n = 0;
      }
      playlist[n].track.preview_url;
    }
    return n;
  }

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

  