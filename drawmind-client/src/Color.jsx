import {FaCheck} from "react-icons/fa";

function Color({color, config, setConfig}) {
    function handleColorClick() {
        setConfig({...config, strokeStyle: color});
    }

    function isThisColorSelected() {
        return config.strokeStyle === color;
    }

    function isColorYellow() {
        return config.strokeStyle === "yellow";
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
