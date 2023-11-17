import './MyButton.css';

export default function MyButton() {
    const isSpecial = true;
    let buttonText = '';
    if (isSpecial) {
        buttonText = 'this is special';
    } else {
        buttonText = 'boring button.'
    }

    return (
    <button className = "MyButton">{buttonText}</button>
    );
}
    