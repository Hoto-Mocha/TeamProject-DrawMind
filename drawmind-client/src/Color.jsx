import config from "bootstrap/js/src/util/config.js";

function Color({color, config, setConfig}) {
    function handleColorClick() {
        setConfig({...config, strokeStyle: color});
    }

    return (
        <div
            className="color"
            style={{ backgroundColor: color }}
            onClick={handleColorClick}
        ></div>
    )
}

export default Color
