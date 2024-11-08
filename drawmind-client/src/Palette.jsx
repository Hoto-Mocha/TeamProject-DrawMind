import Color from "./Color.jsx";
import './css/Palette.css'

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple', 'black'];

function Palette({contextRef, undo, redo, clear}) {
    return (
        <div className={'palette'}>
            {/* 색깔 바꾸는 곳 */}
            {
                colors.map((color, index) => {
                    return (
                        <Color key={index}
                               color={color}
                               contextRef={contextRef}
                        ></Color>
                    )
                })
            }
            <button onClick={undo}>undo</button>
            <button onClick={redo}>redo</button>
            <button onClick={clear}>clear</button>
        </div>
    )
}

export default Palette;
