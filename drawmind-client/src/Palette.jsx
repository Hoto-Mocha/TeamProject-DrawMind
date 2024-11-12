import Color from "./Color.jsx";
import './css/Palette.css'
import BrushSize from "./BrushSize.jsx";

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple', 'black'];

function Palette({config, setConfig, undo, redo, clear, isDrawingMode, setDrawingMode}) {

    return (
        <div className={'palette'}>
            {/* 색깔 바꾸는 곳 */}
            {
                colors.map((color, index) => {
                    return (
                        <Color key={index}
                               color={color}
                               config={config}
                               setConfig={setConfig}
                        ></Color>
                    )
                })
            }
            <button onClick={undo}>undo</button>
            <button onClick={redo}>redo</button>
            <button onClick={clear}>clear</button>
            <BrushSize config={config} setConfig={setConfig}></BrushSize>
            <button onClick={() => setDrawingMode(!isDrawingMode)}>
                {isDrawingMode ? "스크롤 모드로 전환" : "드로잉 모드로 전환"}
            </button>
            <button onClick={() => setConfig({...config, lineCap: 'square', lineJoin: ''})}>
                <div>네모</div>
            </button>
            <button onClick={() => setConfig({...config, lineCap: 'round', lineJoin: 'round'})}>
                <div>동그라미</div>
            </button>
        </div>
    )
}

export default Palette;
