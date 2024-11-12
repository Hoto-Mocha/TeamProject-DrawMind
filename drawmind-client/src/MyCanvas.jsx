import { useEffect, useRef, useState } from "react";
import Palette from "./Palette.jsx";
import './css/MyCanvas.css';

function MyCanvas({ postRef, editorData, nextBtnHandler }) {
    const canvasRef = useRef(null);
    const [isDrawing, setDrawing] = useState(false);
    const contextRef = useRef(null);
    const savedImageRef = useRef(null);

    let step = [];
    const [undoSteps, setUndoSteps] = useState([]);
    const [redoSteps, setRedoSteps] = useState([]);
    const [moveAvailable, setMoveAvailable] = useState(false);

    // 화면 크기 조절에 대응
    const resizeCanvas = () => {
        const postElement = postRef.current;
        const canvasElement = canvasRef.current;

        if (postElement && canvasElement) {
            if (contextRef.current) {
                savedImageRef.current = contextRef.current.getImageData(0, 0, canvasElement.width, canvasElement.height);
            }

            canvasElement.width = postElement.clientWidth;
            canvasElement.height = postElement.clientHeight;

            const context = canvasElement.getContext("2d", {willReadFrequently: true});
            context.scale(1, 1);
            contextRef.current = context;
            contextRef.current.lineWidth = 2;
            contextRef.current.lineCap = "round";
            contextRef.current.strokeStyle = '#000000'; // 초기 색상 설정

            if (savedImageRef.current) {
                context.putImageData(savedImageRef.current, 0, 0);
            }
        }
    };

    // 그리기 기능
    const draw = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        step.push({ offsetX, offsetY, color: contextRef.current.strokeStyle });
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    };

    // 그리기 기능 on Mobile
    function drawMobile(e) {
        if (!isDrawing) return;
        const touch = e.touches[0];
        const rect = canvasRef.current.getBoundingClientRect();
        const offsetX = touch.clientX - rect.left;
        const offsetY = touch.clientY - rect.top;
        step.push({ offsetX, offsetY, color: contextRef.current.strokeStyle });
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    }

    // 창 크기 조절 시 resizeCanvas를 호출함
    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    // 저장된 기록을 기반으로 그림 다시 그리기
    const drawPath = () => {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.beginPath();

        for (const path of undoSteps) {
            for (const { offsetX, offsetY, color, clear } of path) {
                if (clear === true) {
                    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                } else {
                    context.strokeStyle = color;
                    context.lineTo(offsetX, offsetY);
                    context.stroke();
                    context.moveTo(offsetX, offsetY);
                }
            }
            context.beginPath();
        }
    };

    //
    useEffect(() => {
        drawPath();
    }, [undoSteps]);

    // undo 기능
    const undo = () => {
        setUndoSteps((prevSteps) => {
            if (prevSteps.length === 0) return prevSteps;
            const lastStep = prevSteps[prevSteps.length - 1];
            setRedoSteps((prevRedoSteps) => [lastStep, ...prevRedoSteps]);
            return prevSteps.slice(0, -1);
        });
    };

    // redo 기능
    const redo = () => {
        setRedoSteps((prevRedoSteps) => {
            if (prevRedoSteps.length === 0) return prevRedoSteps;
            const lastRedo = prevRedoSteps[0];
            setUndoSteps((prevSteps) => [...prevSteps, lastRedo]);
            return prevRedoSteps.slice(1);
        });
    };

    // 화면 초기화 기능
    const clear = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setUndoSteps((prevSteps) => [...prevSteps, [{ clear: true }]]);
    };

    const btnToggle = () => {
        setMoveAvailable(!moveAvailable)
        const scrollContainer = document.querySelector(".drawEditorArea");
        if (moveAvailable && scrollContainer) {
            scrollContainer.style.overflow = "hidden"; // 스크롤 잠금
        } else if (scrollContainer) {
            scrollContainer.style.overflow = "auto"; // 스크롤 복구
        }
    }

    return (
        <div className="editorArea">
            <div className="drawEditorArea">
                <div ref={postRef} className='contentBox'>
                    <div dangerouslySetInnerHTML={{ __html: editorData }} />
                </div>
                <div className="myCanvas">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={(e) => {
                            if (!moveAvailable) {
                                setDrawing(true);
                                step = [];
                            }
                        }}
                        onMouseUp={(e) => {
                            if (!moveAvailable) {
                                setDrawing(false);
                                contextRef.current.beginPath();
                                setUndoSteps((prevSteps) => [...prevSteps, step]);
                                setRedoSteps([]);
                            }
                        }}
                        onMouseMove={(e) => {
                            if (!moveAvailable) {
                                draw(e);
                            }
                        }}
                        onTouchStart={(e) => {
                            if (!moveAvailable) {
                                e.preventDefault();
                                setDrawing(true);
                                step = [];
                            }
                        }}
                        onTouchEnd={(e) => {
                            if (!moveAvailable) {
                                e.preventDefault();
                                setDrawing(false);
                                contextRef.current.beginPath();
                                setUndoSteps((prevSteps) => [...prevSteps, step]);
                                setRedoSteps([]);
                            }
                        }}
                        onTouchMove={(e) => {
                            if (!moveAvailable) {
                                e.preventDefault();
                                drawMobile(e);
                            }
                        }}
                    />

                </div>
            </div>
            <div className="toolArea">
                <Palette contextRef={contextRef} undo={undo} redo={redo} clear={clear} btnToggle={btnToggle} moveAvailable={moveAvailable} nextBtnHandler={nextBtnHandler} />
            </div>
        </div>
    );
}

export default MyCanvas;