import { useState } from "react";
import Color from "./Color.jsx";
import './css/Palette.css'
import { FaUndoAlt, FaRedoAlt, FaTrashAlt } from "react-icons/fa";
import { IoMdMove } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple', 'black'];

function Palette({ contextRef, undo, redo, clear, btnToggle, moveAvailable, nextBtnHandler }) {

    const [selectedColor, setSelectedColor] = useState('black')

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
                    <FaTrashAlt className="icon" onClick={clear} />
                    <button className="btn btn-danger btn-sm" onClick={nextBtnHandler}>이전</button>
                </div>
            </div>
        </div>
    )
}

export default Palette;
