import Color from "./Color.jsx";
import './css/Palette.css'
import { FaUndoAlt, FaRedoAlt, FaTrashAlt } from "react-icons/fa";
import { IoMdMove } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple', 'black'];

function Palette({ contextRef, undo, redo, clear, btnToggle, moveAvailable }) {
    return (
        <div className='palette'>
            <div className="colorPalette">
                {
                    colors.map((color, index) => {
                        return (
                            <Color key={index}
                                color={color}
                                contextRef={contextRef}
                            ></Color>
                        )
                    })
                }
            </div>
            <div className="btnPalette">
                <FaUndoAlt className="icon" onClick={undo} />
                <FaRedoAlt className="icon" onClick={redo} />
                <FaTrashAlt className="icon" onClick={clear} />
                {!moveAvailable && <RiPencilFill className="icon" onClick={btnToggle} />}
                {moveAvailable && <IoMdMove className="icon" onClick={btnToggle} />}
            </div>
        </div>
    )
}

export default Palette;
