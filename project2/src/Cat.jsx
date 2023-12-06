import './Cat.css';
import { useState } from 'react';

const SAMPLE_PLAYLIST_ID = '37i9dQZF1DX9wa6XirBPv8';


export default function Cat({ imgSrc1 , imgSrc2 , access}) {

    const [ catImage , UpdateCatImage ] = useState(imgSrc1);

    function Sing(){
        UpdateCatImage(imgSrc2);
        audio.play();
        getSong();
    }

    function CloseMouth() {
        UpdateCatImage(imgSrc1);
    }

    function getSong() {
        var playlistParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
          }
        }
        // choose which playlist to use
        var playlistID = fetch('https://api.spotify.com/v1/playlists/' + SAMPLE_PLAYLIST_ID, playlistParameters)
          .then(response => response.json())
          .then(data => console.log(data.tracks.items))    
    }

    let audioPrev = "o";


    let audio = new Audio(audioPrev);
    audio.addEventListener("ended", CloseMouth);

    return (
    <div><button onClick={ Sing } className="Cat"><img src={catImage}></img></button></div>
    );


}


    