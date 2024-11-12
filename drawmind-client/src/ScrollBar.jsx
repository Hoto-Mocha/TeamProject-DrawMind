import './css/ScrollBar.css';
import {useEffect, useRef, useState} from 'react';

function ScrollBar({ config, setConfig, buttonOffsetX, setButtonOffsetX }) {
    const [isDragging, setIsDragging] = useState(false);
    const [mouseOffsetX, setMouseOffsetX] = useState(0);


    function handleMouseDown(e) {
        setIsDragging(true);
        setMouseOffsetX(e.clientX);
    }

    function handleMouseMove(e) {
        if (!isDragging)
            return
        let diff = buttonOffsetX + e.clientX - mouseOffsetX;
        if (diff < 0) diff = 0
        if (diff > 112) diff = 112
        setButtonOffsetX(diff);
        setMouseOffsetX(e.clientX);

        setConfig({...config, lineWidth: diff})
    }

    function handleMouseUp(e) {
        setIsDragging(false);
        console.log(e)
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging]);

    return (
        <div className="scrollBar"
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
        >
            <div
                className={'scrollBar-button'}
                style={{
                    position: 'absolute',
                    background: 'white',
                    borderRadius: '0.2rem',
                    border: '1px solid black',
                    width: '1rem',
                    height: '0.8rem',
                    left: buttonOffsetX,
                }}
            >
            </div>
        </div>
    );
}

export default ScrollBar;
