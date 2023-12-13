import './Cat.css';
import { useState } from 'react';

const SAMPLE_PLAYLIST_ID = '37i9dQZF1DX9wa6XirBPv8';


export default function Cat({ imgSrc1 , imgSrc2 , access}) {

    const [ catImage , UpdateCatImage ] = useState(imgSrc1);
    const [ audio, UpdateAudio ] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    
    if (audio) {
        audio.addEventListener("ended", CloseMouth);
    }
    
  

    function Sing(){
        UpdateCatImage(imgSrc2);
        audio.play();
    }

    function CloseMouth() {
        UpdateCatImage(imgSrc1);
    }

    function getPlaylist() {
      console.log("got playlist");
      var playlistParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
          }
        }
        
        // choose which playlist to use
        var playlist = fetch('https://api.spotify.com/v1/playlists/' + SAMPLE_PLAYLIST_ID, playlistParameters)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            let trackNum = Math.floor(Math.random() * data.tracks.items.length);
            let preview = data.tracks.items[trackNum].track.preview_url;
            while (preview == null) {
              preview = data.tracks.items[trackNum].track.preview_url;
            }
            console.log(preview);
            const audio = new Audio(preview)
            audio.addEventListener("canplay", Sing)
            UpdateAudio(audio);

          })
          .catch((err) => {
            console.log(err.message);
          });  
    }

    return (
    <div><button onClick={ getPlaylist } className="Cat"><img class = "catPic" src={catImage}></img></button></div>
    );


}


    