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

// import audio1 from "./assets/gorillaz-19-2000.mp3";
// import audio2 from "./assets/using-sorority-noise.mp3";
// import audio3 from "./assets/cavetown-talk-to-me.mp3";
// import audio4 from "./assets/vivaldi-winter.mp3";

// const text1 = "Gorillaz - 19-2000";
// const text2 = "Sorority Noise - Using";
// const text3 = "Cavetown - Talk to Me";
// const text4 = "Vivaldi - Winter";

const playlistID_1 = '37i9dQZF1DXasneILDRM7B'; // "Pure Pop Punk"
const playlistID_2 = '37i9dQZF1EId3k9ylpDgha'; // "Midwest Emo Mix"
const playlistID_3 = '37i9dQZF1EIgBrmye0h40Y'; // "Cozy Indie Mix"
const playlistID_4 = '37i9dQZF1DWZCkamcYMQkz'; // "Feel Good Jazz"

const siteTitle = "Beats n' Cats";

export default function App() {
  
  const [accessToken, setToken] = useState(''); 

  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(true);
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

  const [ title1, updateTitle1 ] = useState('');
  const [ title2, updateTitle2 ] = useState('');
  const [ title3, updateTitle3 ] = useState('');
  const [ title4, updateTitle4 ] = useState('');

  const [ artist1, updateArtist1 ] = useState(['']);
  const [ artist2, updateArtist2 ] = useState(['']);
  const [ artist3, updateArtist3 ] = useState(['']);
  const [ artist4, updateArtist4 ] = useState(['']);

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
            const tracks2 = await fetchPlaylist(accessToken, playlistID_2);
            setPlaylist2(tracks2);
            const tracks3 = await fetchPlaylist(accessToken, playlistID_3);
            setPlaylist3(tracks3);
            const tracks4 = await fetchPlaylist(accessToken, playlistID_4);
            setPlaylist4(tracks4);
          } catch (error) {
            console.error('Error fetching playlists');
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

  if (playlist1 && playlist2 && playlist3 && playlist4 && loadingSongs && loadingPlaylists) {
    setLoadingPlaylists(false);
    const track1 = loadPlaylistData(playlist1);
    updateTrackNum1(track1[0]);
    updateCatSong1(track1[1]);
    updateTitle1(track1[2]);
    updateArtist1(track1[3]);
    console.log('Track 1:', track1);
    const track2 = loadPlaylistData(playlist2);
    updateTrackNum2(track2[0]);
    updateCatSong2(track2[1]);
    updateTitle2(track2[2]);
    updateArtist2(track2[3]);
    //console.log("Track 2:", track2);
    const track3 = loadPlaylistData(playlist3);
    updateTrackNum3(track3[0]);
    updateCatSong3(track3[1]);
    updateTitle3(track3[2]);
    updateArtist3(track3[3]);
    //console.log("Track 3:", track3);
    const track4 = loadPlaylistData(playlist4);
    updateTrackNum4(track4[0]);
    updateCatSong4(track4[1]);
    updateTitle4(track4[2]);
    updateArtist4(track4[3]);
    console.log("Track 4:", track4);
    setLoadingSongs(false);
  } 

  async function fetchPlaylist(accessToken, playlistID) {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });

      if (response.ok) {
        const playlistData = await response.json();
        //console.log('Tracks:', playlistData.tracks.items);
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

  function getRandomN(playlist) {
    if (!playlist) {
      return 0;
    } 
    let n = Math.floor(Math.random() * playlist.length);
    let song = playlist[n].track.preview_url;
    while (song == null && !loadingPlaylists){
      if (n < playlist.length-1) {
        n = n+1;
      } else {
        n = 0;
      }
      playlist[n].track.preview_url;
    }
    return n;
  }


  function loadPlaylistData(playlist) {
    if (playlist) {
      const n = getRandomN(playlist);
      const prev = playlist[n].track.preview_url;
      const title = playlist[n].track.name;
      const artist = playlist[n].track.artists[0].name;
      return [n, prev, title, artist];
    } else {
      return [0, null, "", ['']];
    }
  }

  return (
    <div class = "FullApp">
      <img class = "Title" src= { Title } />
      <ul class = "CatList">
        <li><Cat imgSrc1={ CatOneF1 } imgSrc2 = { CatOneF2 } audioSrc = { catSong1 } title = { title1 } artist = { artist1 }/></li>
        <li><Cat imgSrc1={ CatTwoF1 } imgSrc2 = { CatTwoF2 } audioSrc = { catSong2 } title = { title2 } artist = { artist2 }/></li>
        <li><Cat imgSrc1={ CatThreeF1 } imgSrc2 = { CatThreeF2 } audioSrc = { catSong3 } title = { title3 } artist = { artist3 }/></li>
        <li><Cat imgSrc1={ CatFourF1 } imgSrc2 = { CatFourF2 } audioSrc = { catSong4 } title = { title4 } artist = { artist4 }/></li>

      </ul>
    </div>
    );
  }

  