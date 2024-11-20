import {useState} from "react";
import Color from "./Color.jsx";
import '../../css/Palette.css'
import {FaUndoAlt, FaRedoAlt, FaTrashAlt, FaSquare, FaCircle, FaEraser} from "react-icons/fa";
import {IoMdMove} from "react-icons/io";
import {RiPencilFill} from "react-icons/ri";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import BrushSize from "./BrushSize.jsx";
import {completeWriting} from "../write/Write.jsx"
import {useNavigate} from "react-router-dom";
import API from "../../API.jsx";
import CustomColor from "./CustomColor.jsx";
import ColorModal from "./ColorModal.jsx";

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple', 'black'];

function Palette({
                     config,
                     setConfig,
                     undo,
                     redo,
                     clear,
                     btnToggle,
                     moveAvailable,
                     isErasing,
                     setErasing,
                     previousBtnHandler,
                     canvasRef,
                     titleData,
                     editorData,
                     editorSize
                 }) {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkStyle = {
        color: isErasing ? 'white' : config.strokeStyle,
        border: isErasing ? '1px solid black' : 'none'
    }

    const nextBtnHandler = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const imageURL = canvas.toDataURL('image/png')
            completeWriting(navigate, titleData, editorData, imageURL, editorSize)
        }
    }


    return (
        <div className='palette'>
            <div className="colorPalette">
                {
                    colors.map((color, index) => {
                        return (
                            <Color key={index}
                                   color={color}
                                   config={config}
                                   setConfig={setConfig}
                                   isErasing={isErasing}
                                   setErasing={setErasing}
                            ></Color>
                        )
                    })
                }
                <CustomColor
                    config={config}
                    setConfig={setConfig}
                    isErasing={isErasing}
                    setErasing={setErasing}
                ></CustomColor>
                <BrushSize config={config} setConfig={setConfig} isErasing={isErasing}></BrushSize>
                <FaSquare style={checkStyle} className={'palette-button icon'}
                          onClick={() => setConfig({...config, lineCap: 'square', lineJoin: ''})}>
                </FaSquare>
                <FaCircle style={checkStyle} className={'palette-button icon'}
                          onClick={() => setConfig({...config, lineCap: 'round', lineJoin: 'round'})}>
                </FaCircle>
                <FaEraser className="icon"
                          onClick={() => setErasing(prev => !prev)}>
                </FaEraser>
            </div>
            <div className="btnPalette">
                <div className="tools">
                    {!moveAvailable && <RiPencilFill className="icon" onClick={btnToggle} style={{scale: '1.2'}}/>}
                    {moveAvailable && <IoMdMove className="icon" onClick={btnToggle} style={{scale: '1.2'}}/>}
                    <FaUndoAlt className="icon" onClick={undo}/>
                    <FaRedoAlt className="icon" onClick={redo}/>
                </div>
                <div className="dangerousTools">
                    <FaTrashAlt className="icon" onClick={handleShow}/>
                    <button className="btn btn-danger btn-sm" onClick={previousBtnHandler}>이전</button>
                    <button className="btn btn-primary btn-sm" onClick={nextBtnHandler}>완료</button>
                </div>
            </div>
            <ConfirmModal
                show={show}
                handleClose={handleClose}
                title="그림을 모두 삭제하시겠습니까?"
                message="삭제 후에도 되돌리기를 통해 복구가 가능합니다."
                noBtnMsg="취소"
                yesBtnMsg="확인"
                yesBtnHandler={clear}
            />
        </div>
    )
}

export default Palette;
