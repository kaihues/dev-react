import './Cat.css';
import { useState, useEffect } from 'react';

export default function Cat({ imgSrc1 , imgSrc2 , access , playlistID }) {

  const [ catImage , UpdateCatImage ] = useState(imgSrc1);
  const [ catSong, UpdateCatSong ] = useState(null);

  const [playlist, setPlaylist] = useState(null);
  const [ trackNum, updateTrackNum ] = useState(0);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

  useEffect(() => {
    var playlistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access
      }
    }
    // load each playlist as state object
    fetch('https://api.spotify.com/v1/playlists/' + playlistID, playlistParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPlaylist(data.tracks.items);
        let n = 0;
        while (catSong == null) {
          n = Math.floor(Math.random() * data.tracks.total);
          let song = data.tracks.items[n].track.preview_url;
          UpdateCatSong(song);
        }
        updateTrackNum(n);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let audio = new Audio(catSong);
    
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


    