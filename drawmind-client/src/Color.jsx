function Color({color, contextRef}) {
    function handleColorClick() {
        contextRef.current.strokeStyle = color;
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
