import ScrollBar from "./ScrollBar.jsx";
import {useState} from "react";

function BrushSizeController({setIsBrushSizeClicked, brushSizeControllerRef, config, setConfig, buttonOffsetX, setButtonOffsetX}) {
    return (
        <div className={'BrushSizeController'}
             ref={brushSizeControllerRef}
             onClick={(e) => {e.stopPropagation()}}
             tabIndex={-1}
             onBlur={() => {
                 setIsBrushSizeClicked(prev => !prev)
             }}
             style={{
                 position: 'absolute',
                 width: '11.2rem',
                 height: '2.3rem',
                 top: '-2.5rem',
                 left: '-4rem',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-between',
             }}
        >
            <ScrollBar
                config={config}
                setConfig={setConfig}
                buttonOffsetX={buttonOffsetX}
                setButtonOffsetX={setButtonOffsetX}
            ></ScrollBar>
            {Math.round(config.lineWidth)}
        </div>
    )
}

export default BrushSizeController
