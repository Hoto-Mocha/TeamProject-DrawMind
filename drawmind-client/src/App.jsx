import {useEffect, useRef, useState} from "react";
import './css/App.css';
import MyCanvas from "./MyCanvas.jsx";

export default function App() {
    const postRef = useRef(null);  // 포스트를 참조하는 useRef
    return (
        <div
            style={{position: "relative", border: "1px solid black"}}
        >
            <div ref={postRef}
                 style={{position: "absolute", background: 'yellow'}}
            >
                <p>여기에 포스트 내용이 들어갑니다...</p>
                <p>여기에 포스트 내용이 들어갑니다...</p>
                <p>여기에 포스트 내용이 들어갑니다...</p>
                <p>여기에 포스트 내용이 들어갑니다...</p>
                <p>여기에 포스트 내용이 들어갑니다...</p>
            </div>
            <MyCanvas postRef={postRef}></MyCanvas>
        </div>
    );
}
