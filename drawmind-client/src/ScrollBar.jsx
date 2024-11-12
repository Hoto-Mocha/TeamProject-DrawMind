import './css/ScrollBar.css';
import {useEffect, useRef, useState} from 'react';

function ScrollBar({ config, setConfig, buttonOffsetX, setButtonOffsetX }) {
    const [isDragging, setIsDragging] = useState(false);
    const [mouseOffsetX, setMouseOffsetX] = useState(0);
    const [touchOffsetX, setTouchOffsetX] = useState(0);
    const scrollBarRef = useRef(null);

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

    function handleMouseUp() {
        setIsDragging(false);
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

    function handleTouchStart(e) {
        setIsDragging(true);
        e.preventDefault()
        const touch = e.touches[0]
        const rect = scrollBarRef.current.getBoundingClientRect()
        setTouchOffsetX(touch.clientX - rect.left);
    }

    function handleTouchMove(e) {
        if (!isDragging)
            return
        e.preventDefault()
        const touch = e.touches[0];
        const rect = scrollBarRef.current.getBoundingClientRect();
        const offsetX = touch.clientX - rect.left;

        let diff = buttonOffsetX + offsetX - touchOffsetX;
        if (diff < 0) diff = 0
        if (diff > 112) diff = 112
        setButtonOffsetX(diff);
        setTouchOffsetX(touch.clientX - rect.left);

        setConfig({...config, lineWidth: diff})
    }

    return (
        <div className="scrollBar"
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleMouseUp}
             ref={scrollBarRef}
             style={{touchAction: 'none'}}
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
