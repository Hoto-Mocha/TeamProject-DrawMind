import { useState } from "react";
import Color from "./Color.jsx";
import './css/Palette.css'
import { FaUndoAlt, FaRedoAlt, FaTrashAlt } from "react-icons/fa";
import { IoMdMove } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import ConfirmModal from "./components/common/ConfirmModal.jsx";

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple', 'black'];

function Palette({ contextRef, undo, redo, clear, btnToggle, moveAvailable, previousBtnHandler }) {

    const [selectedColor, setSelectedColor] = useState('black')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='palette'>
            <div className="colorPalette">
                {
                    colors.map((color, index) => {
                        return (
                            <Color key={index}
                                color={color}
                                contextRef={contextRef}
                                selectedColor={selectedColor}
                                setSelectedColor={setSelectedColor}
                            ></Color>
                        )
                    })
                }
            </div>
            <div className="btnPalette">
                <div className="tools">
                    {!moveAvailable && <RiPencilFill className="icon" onClick={btnToggle} style={{scale:'1.2'}}/>}
                    {moveAvailable && <IoMdMove className="icon" onClick={btnToggle} style={{scale:'1.2'}}/>}
                    <FaUndoAlt className="icon" onClick={undo} />
                    <FaRedoAlt className="icon" onClick={redo} />
                </div>
                <div className="dangerousTools">
                    <FaTrashAlt className="icon" onClick={handleShow} />
                    <button className="btn btn-danger btn-sm" onClick={previousBtnHandler}>이전</button>
                </div>
            </div>
            <ConfirmModal
                show={show}
                handleClose={handleClose}
                title="그림을 모두 삭제하시겠습니까?"
                message="그림을 삭제하면 되돌릴 수 없습니다."
                noBtnMsg="취소"
                yesBtnMsg="확인"
                yesBtnHandler={clear}
            />
        </div>
    )
}

export default Palette;
