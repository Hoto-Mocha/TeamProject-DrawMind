import {useEffect, useRef, useState} from "react";
import Palette from "./Palette.jsx";
import '../../css/MyCanvas.css';

function MyCanvas({postRef, titleData, editorData, previousBtnHandler, editorSize, imgURL, isEditing, postSeq}) {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const savedImageRef = useRef(null);
    const isDrawingRef = useRef(false);
    const [isErasing, setErasing] = useState(false);
    const [config, setConfig] = useState({
        lineWidth: 1,
        lineCap: 'round',
        strokeStyle: 'black',
        lineJoin: 'round'
    })

    const stepRef = useRef([])
    const [undoSteps, setUndoSteps] = useState([]);
    const [redoSteps, setRedoSteps] = useState([])
    const [moveAvailable, setMoveAvailable] = useState(false);

    function brushSetting() {
        if (contextRef.current) {
            contextRef.current.lineWidth = config.lineWidth;  // 선의 두께 설정
            contextRef.current.lineCap = config.lineCap;  // 선 끝 부분 둥글게 설정
            contextRef.current.strokeStyle = config.strokeStyle;  // 기본 색상 설정
            contextRef.current.lineJoin = config.lineJoin
        }
    }

    const resizeCanvas = () => {
        const postElement = postRef.current;
        const canvasElement = canvasRef.current;

        if (postElement && canvasElement) {
            if (contextRef.current) {
                savedImageRef.current = contextRef.current.getImageData(0, 0, canvasElement.width, canvasElement.height);
            }
            canvasElement.width = postElement.clientWidth;
            canvasElement.height = postElement.clientHeight;

            contextRef.current = canvasElement.getContext("2d", {willReadFrequently: true});
            contextRef.current.scale(1, 1);

            if (savedImageRef.current) {
                contextRef.current.putImageData(savedImageRef.current, 0, 0);
            }
        }
    };

    const draw = (e) => {
        if (!isDrawingRef.current || moveAvailable) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const {clientX, clientY} = e.touches ? e.touches[0] : e;
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;


        if (stepRef.current.length === 0) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
        }

        stepRef.current.push({
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
    };


    useEffect(() => {
        if (imgURL) {
            const img = new Image();
            img.src = imgURL;

            img.onload = () => {
                savedImageRef.current = img;
                if (img.width > canvasRef.current.width || img.height > canvasRef.current.height) {
                    // 이미지가 캔버스보다 큰 경우 → 잘라냄
                    const imgRatio = img.width / img.height;
                    const canvasRatio = canvasRef.current.width / canvasRef.current.height;

                    let sx, sy, sWidth, sHeight;

                    if (imgRatio > canvasRatio) {
                        // 이미지가 더 넓음 → 좌우 잘림
                        sHeight = img.height;
                        sWidth = img.height * canvasRatio;
                        sx = (img.width - sWidth) / 2; // 좌우 잘림
                        sy = 0; // 위아래는 그대로
                    } else {
                        // 이미지가 더 높음 → 위아래 잘림
                        sWidth = img.width;
                        sHeight = img.width / canvasRatio;
                        sx = 0; // 좌우는 그대로
                        sy = (img.height - sHeight) / 2; // 위아래 잘림
                    }

                    contextRef.current.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasRef.current.width, canvasRef.current.height);
                } else {
                    // 이미지가 캔버스보다 작은 경우 → 그대로 그리기
                    contextRef.current.drawImage(img, 0, 0, img.width, img.height);
                }
            };
        }
    }, [imgURL]);

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
        if (contextRef.current) {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            for (const path of undoSteps) {
                contextRef.current.beginPath(); // 경로 시작
                for (const {offsetX, offsetY, color, width, clear, lineCap, lineJoin, erase} of path) {
                    if (clear === true) {
                        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    } else {
                        contextRef.current.strokeStyle = color;
                        contextRef.current.lineWidth = width;
                        contextRef.current.lineJoin = lineJoin
                        contextRef.current.lineCap = lineCap
                        if (path.indexOf({offsetX, offsetY, color, width, clear, erase}) === 0) {
                            // 첫 번째 점에서 moveTo로 시작점을 설정
                            contextRef.current.moveTo(offsetX, offsetY);
                        } else {
                            if (erase)
                                contextRef.current.clearRect(offsetX - width / 2, offsetY - width / 2, width, width);
                            else
                                contextRef.current.lineTo(offsetX, offsetY);
                        }
                    }
                }
                contextRef.current.stroke(); // 마지막에 stroke로 선을 화면에 표시합니다.
            }
            brushSetting()
        }
    };

    // 한 획을 그을 때마다, 혹은 redo 기능을 사용할 때마다 실행됨
    useEffect(() => {
        drawPath();
    }, [redoSteps]);

    useEffect(() => {
        brushSetting()
    }, [config]);

    const undo = () => {
        setUndoSteps((prevSteps) => {
            if (prevSteps.length === 0) return prevSteps;
            const lastStep = prevSteps[prevSteps.length - 1];
            setRedoSteps(prev => [lastStep, ...prev])
            return prevSteps.slice(0, -1);
        });
    };

    // redo 기능
    const redo = () => {
        setRedoSteps((prevSteps) => {
            if (prevSteps.length === 0) return prevSteps;
            const lastStep = prevSteps[0];
            setUndoSteps(prev => [...prev, lastStep])
            return prevSteps.slice(1);
        })

    };

    // 화면 초기화 기능
    const clear = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setUndoSteps((prevSteps) => [...prevSteps, [{clear: true}]]);
    };

    return (
        <div className="editorArea">
            <div className="drawEditorArea"
                 style={{
                     overflow: moveAvailable ? 'auto' : 'hidden',
                 }}
            >
                <div ref={postRef} className='contentBox'>
                    <div className="innerHtml" dangerouslySetInnerHTML={{__html: editorData}}/>
                </div>
                <div className="myCanvas">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={(e) => {
                            if (!moveAvailable) {
                                isDrawingRef.current = true;
                                stepRef.current = []
                                draw(e)
                            }
                        }}
                        onMouseMove={draw}
                        onMouseUp={() => {
                            if (!moveAvailable) {
                                isDrawingRef.current = false
                                setUndoSteps((prevSteps) => [...prevSteps, stepRef.current]);
                                if (redoSteps.length !== 0)
                                    setRedoSteps([])
                            }
                        }}

                        onTouchStart={(e) => {
                            if (!moveAvailable) {
                                e.preventDefault()
                                isDrawingRef.current = true;
                                stepRef.current = [];
                                draw(e)
                            }
                        }}
                        onTouchEnd={(e) => {
                            if (!moveAvailable) {
                                e.preventDefault();
                                isDrawingRef.current = false
                                setUndoSteps((prevSteps) => [...prevSteps, stepRef.current]);
                                if (redoSteps.length !== 0)
                                    setRedoSteps([])
                            }
                        }}
                        onTouchMove={e => {
                            e.preventDefault()
                            draw(e)
                        }}
                    />
                </div>
            </div>
            <hr/>
            <div className="toolArea">
                <Palette
                    config={config}
                    setConfig={setConfig}
                    undo={undo}
                    redo={redo}
                    clear={clear}
                    moveAvailable={moveAvailable}
                    setMoveAvailable={setMoveAvailable}
                    isErasing={isErasing}
                    setErasing={setErasing}
                    previousBtnHandler={previousBtnHandler}
                    canvasRef={canvasRef}
                    titleData={titleData}
                    editorData={editorData}
                    editorSize={editorSize}
                    isEditing={isEditing}
                    postSeq={postSeq}
                />
            </div>
        </div>
    );
}

export default MyCanvas;
