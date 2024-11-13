import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import "../../css/contentView.css";

function ContentView() {
    const location = useLocation();
    const data = location.state; // 'state'를 통해 데이터 받기
    const writer = data.writer
    const date = data.date
    const title = data.title
    const content = data.content
    const imgURL = data.imgURL
    const editorSize = data.editorSize-2

    const [imageVisiblity, setImageVisiblity] = useState(true)

    const contentStyle = {
        width: editorSize
    }

    const imageStyle = {
        display: imageVisiblity ? "block" : "none",
    }

    const imageVisiblityBtnHandler = () => {
        setImageVisiblity(!imageVisiblity)
    }

    return (
        <div>
            <div className='contentView'>
                <h1 className='contentView-title sidePadding'>{title}</h1>
                <div className='contentView-postInfo sidePadding'>
                    <p>{writer}</p>
                    <p>{date}</p>
                </div>
                <hr />
                <div className='contentView-content-container'>
                    <img className='contentView-image' src={imgURL} style={imageStyle}></img>
                    <div className='contentView-content sidePadding' dangerouslySetInnerHTML={{ __html: content }} style={contentStyle}/>
                </div>
                <div>
                    {imageVisiblity && <button className='btn btn-primary nonSelect' onClick={imageVisiblityBtnHandler}>이미지 숨기기</button>}
                    {!imageVisiblity && <button className='btn btn-primary nonSelect' onClick={imageVisiblityBtnHandler}>이미지 보이기</button>}
                </div>
            </div>
        </div>

    )
}

export default ContentView
