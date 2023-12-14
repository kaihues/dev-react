import './Cat.css';
import { useState } from 'react';

export default function Cat({ imgSrc1 , imgSrc2 , audioSrc, catText }) {

  const [ catImage , UpdateCatImage ] = useState(imgSrc1);

  const [ text , UpdateCatText ] = useState("");

  let audio = new Audio(audioSrc);
    
    if (audio) {
        audio.addEventListener("ended", CloseMouth);
    }
    
    function Sing(){
        UpdateCatImage(imgSrc2);
        UpdateCatText(catText);
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
        UpdateCatText("");
    }

    return (
    <div><button onClick={ Sing } className="Cat Grow"><img className = "CatPic" src={catImage}></img><p> { text } </p></button></div>
    );


}


    