import './Cat.css';
import { useState } from 'react';

export default function Cat({ imgSrc1 , imgSrc2 , access , playlist }) {
  let trackNum = Math.floor(Math.random() * 50); //playlist.length
  let audio = new Audio(null);
  if (playlist != null) {
    console.log("playlist not null")
    audio = playlist[trackNum].track.preview_url;
    while (audio == null) {
      trackNum = Math.floor(Math.random() * playlist.length);
      audio = playlist[trackNum].track.preview_url;
    }
  }
  else {
    audio = null;
  }

    

    const [ catImage , UpdateCatImage ] = useState(imgSrc1);
    // const [ track, updateTrack ] = useState(trackNum);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    
    if (audio) {
        audio.addEventListener("ended", CloseMouth);
    }
    
    function Sing(){
        UpdateCatImage(imgSrc2);
        audio.play();
        if(audio != null) {
          audio.play();
        }
        else{
          console.log("audio null")
        }
        
    }

    function CloseMouth() {
        UpdateCatImage(imgSrc1);
    }

    return (
    <div><button onClick={ Sing } className="Cat Grow"><img class = "CatPic" src={catImage}></img></button></div>
    );


}


    