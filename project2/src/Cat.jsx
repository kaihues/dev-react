import './Cat.css';
import { useState } from 'react';

export default function Cat({ imgSrc1 , imgSrc2 , access, playlistId}) {

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
        var playlist = fetch('https://api.spotify.com/v1/playlists/' + playlistId, playlistParameters)
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
    <div><button onClick={ getPlaylist } className="Cat Grow"><img class = "CatPic" src={catImage}></img></button></div>
    );


}


    