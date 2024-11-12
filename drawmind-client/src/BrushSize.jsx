import {useRef, useState, useEffect} from "react";
import BrushSizeController from "./BrushSizeController.jsx";

function BrushSize({config, setConfig}) {
    const [isBrushSizeClicked, setIsBrushSizeClicked] = useState(false);
    const brushSizeControllerRef = useRef(null);
    const [buttonOffsetX, setButtonOffsetX] = useState(2);

    useEffect(() => {
        if (isBrushSizeClicked && brushSizeControllerRef.current) {
            brushSizeControllerRef.current.focus();
        }
    }, [isBrushSizeClicked]);

    return (
        <div
            className={'brush-size'}
            style={{
                width: '2rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
            onClick={() => setIsBrushSizeClicked(prev => !prev)}
        >
            <div
                style={{
                    height: config.lineWidth,
                    width: config.lineWidth,
                    backgroundColor: config.strokeStyle,
                    borderRadius: config.lineCap === 'round' ? config.lineWidth / 2 : 0,
                }}
            ></div>
            {
                isBrushSizeClicked &&
                <BrushSizeController
                    brushSizeControllerRef={brushSizeControllerRef}
                    setIsBrushSizeClicked={setIsBrushSizeClicked}
                    config={config}
                    setConfig={setConfig}
                    buttonOffsetX={buttonOffsetX}
                    setButtonOffsetX={setButtonOffsetX}
                />
            }
        </div>
    )
}

export default BrushSize;
