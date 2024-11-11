import { useRef } from 'react'
import MyCanvas from "../../MyCanvas.jsx";
import "../../css/Write.css"

function Write() {
    const postRef = useRef(null);  // 포스트를 참조하는 useRef
    return (
        <div className='content'>
            <MyCanvas postRef={postRef}></MyCanvas>
        </div>
    );
}

export default Write
