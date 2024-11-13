import {useEffect, useRef, useState} from "react";
import Palette from "./Palette.jsx";
import './css/MyCanvas.css';

function MyCanvas({postRef, titleData, editorData, previousBtnHandler, editorSize}) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const savedImageRef = useRef(null);
    const [isDrawing, setDrawing] = useState(false);
    const [isErasing, setErasing] = useState(false);
    const [config, setConfig] = useState({
        lineWidth: 1,
        lineCap: 'round',
        strokeStyle: 'black',
        lineJoin: 'round'
    })

    let step = [];
    const [undoSteps, setUndoSteps] = useState([]);
    const [redoSteps, setRedoSteps] = useState([]);
    const [moveAvailable, setMoveAvailable] = useState(false);

    function brushSetting() {
        const canvasElement = canvasRef.current;
        contextRef.current = canvasElement.getContext("2d");
        contextRef.current.lineWidth = config.lineWidth;  // 선의 두께 설정
        contextRef.current.lineCap = config.lineCap;  // 선 끝 부분 둥글게 설정
        contextRef.current.strokeStyle = config.strokeStyle;  // 기본 색상 설정
        contextRef.current.lineJoin = config.lineJoin
    }

    const resizeCanvas = () => {
        const postElement = postRef.current;
        const canvasElement = canvasRef.current;

        if (postElement && canvasElement) {
            if (contextRef.current) {
                savedImageRef.current = contextRef.current.getImageData(0, 0, canvasElement.width, canvasElement.height);
            }
            console.log("postElement width : ", postElement.clientWidth)

            canvasElement.width = postElement.clientWidth;
            canvasElement.height = postElement.clientHeight;

            const context = canvasElement.getContext("2d", {willReadFrequently: true});
            context.scale(1, 1);
            if (savedImageRef.current) {
                context.putImageData(savedImageRef.current, 0, 0);
            }
        }
    };

    const drawPC = (e) => {
        if (!isDrawing || moveAvailable) return;
        const {offsetX, offsetY} = e.nativeEvent;
        draw(offsetX, offsetY);
    };

    const drawMobile = (e) => {
        if (!isDrawing || moveAvailable) return;
        const touch = e.touches[0];
        const rect = canvasRef.current.getBoundingClientRect();
        const offsetX = touch.clientX - rect.left;
        const offsetY = touch.clientY - rect.top;
        draw(offsetX, offsetY);
    };

    function draw(offsetX, offsetY) {
        if (step.length === 0) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
        }

        step.push({
            offsetX,
            offsetY,
            color: contextRef.current.strokeStyle,
            width: contextRef.current.lineWidth,
            lineCap: contextRef.current.lineCap,
            lineJoin: contextRef.current.lineJoin,
            erase: isErasing
        });

        if (isErasing) {
            // 지우기 기능 수행 (지정된 사각형 영역을 지우기)
            canvasRef.current.getContext('2d').clearRect(
                offsetX - contextRef.current.lineWidth / 2,
                offsetY - contextRef.current.lineWidth / 2,
                contextRef.current.lineWidth,
                contextRef.current.lineWidth
            );
        } else {
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
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

        for (const path of undoSteps) {
            context.beginPath(); // 경로 시작
            for (const {offsetX, offsetY, color, width, clear, lineCap, lineJoin, erase} of path) {
                if (clear === true) {
                    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                } else {
                    context.strokeStyle = color;
                    context.lineWidth = width;
                    context.lineJoin = lineJoin
                    context.lineCap = lineCap
                    if (path.indexOf({offsetX, offsetY, color, width, clear, erase}) === 0) {
                        // 첫 번째 점에서 moveTo로 시작점을 설정
                        context.moveTo(offsetX, offsetY);
                    } else {
                        if (erase)
                            context.clearRect(offsetX - width / 2, offsetY - width / 2, width, width);
                        else
                            context.lineTo(offsetX, offsetY);
                    }
                }
            }
            context.stroke(); // 마지막에 stroke로 선을 화면에 표시합니다.
        }
    };

    //
    useEffect(() => {
        drawPath();
        brushSetting()
    }, [undoSteps]);

    useEffect(() => {
        brushSetting()
    }, [config]);

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
        setUndoSteps((prevSteps) => [...prevSteps, [{clear: true}]]);
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
                    <div dangerouslySetInnerHTML={{__html: editorData}}/>
                </div>
                <div className="myCanvas">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={() => {
                            if (!moveAvailable) {
                                setDrawing(true);
                                step = [];
                            }
                        }}
                        onMouseUp={() => {
                            if (!moveAvailable) {
                                setDrawing(false);
                                setUndoSteps((prevSteps) => [...prevSteps, step]);
                                setRedoSteps([]);
                            }
                        }}
                        onMouseMove={drawPC}
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
            <hr />
            <div className="toolArea">
                <Palette
                    config={config}
                    setConfig={setConfig}
                    undo={undo}
                    redo={redo}
                    clear={clear}
                    btnToggle={btnToggle}
                    moveAvailable={moveAvailable}
                    isErasing={isErasing}
                    setErasing={setErasing}
                    previousBtnHandler={previousBtnHandler}
                    canvasRef={canvasRef}
                    titleData={titleData}
                    editorData={editorData}
                    editorSize={editorSize}
                />
            </div>
        </div>
    );
}

export default MyCanvas;
