import './Cat.css';
import { useState } from 'react';

export default function Cat({ imgSrc1 , imgSrc2, catAudio , text }) {

    const [ catImage , UpdateCatImage ] = useState(imgSrc1);

    let audio = new Audio(catAudio);
    audio.addEventListener("ended", CloseMouth);

    function Sing(){
        UpdateCatImage(imgSrc2);
        audio.play();
    }

    function CloseMouth() {
        UpdateCatImage(imgSrc1);
    }

    return (
    <div><button onClick={ Sing } className="Cat"><img src={catImage}></img></button><p>{ text }</p></div>
    );
}
    