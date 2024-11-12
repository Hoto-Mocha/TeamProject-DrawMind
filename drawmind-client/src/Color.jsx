import { FaCheck } from "react-icons/fa6";
import "../src/css/Color.css"

function Color({color, contextRef, selectedColor, setSelectedColor}) {
    function handleColorClick() {
        contextRef.current.strokeStyle = color;
        setSelectedColor(color)
    }

    function isThisColorSelected() {
        return selectedColor === color;
    }

    function isColorYellow() {
        return selectedColor === "yellow";
    }

    const checkStyle = {
        display: isThisColorSelected() ? "block" : "none",
        color: isColorYellow() ? "black" : "white"
    }

    return (
        <div
            className="color"
            style={{ backgroundColor: color }}
            onClick={handleColorClick}
        ><FaCheck className="paletteIcon" style={checkStyle} /></div>
    )
}

export default Color
