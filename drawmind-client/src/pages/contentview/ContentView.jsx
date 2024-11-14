import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../../css/contentView.css";
import API from '../../API';
import toast, { toastConfig } from 'react-simple-toasts';

toastConfig({
    theme: 'dark',
});

function ContentView() {
    const postSeq = parseInt(useParams());
    
    var writer = ''
    var date = ''
    var title = ''
    var content = ''
    var imgURL = ''
    var editorSize = 0

    useEffect(() => {
        let data = null
        API.postDetail(postSeq)
            .then((res) => {
                data = res.data.body
                if (data) {
                    writer = data.writer
                    date = data.regDate
                    title = data.postTitle
                    content = data.content
                    imgURL = data.imgURL
                    editorSize = data.postWidth - 2
                }
            })
            .catch((err) => {
                console.log(err)
                toast('게시글 정보를 불러올 수 없었습니다.')
            })

    }, [])

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
                    <div className='contentView-content sidePadding' dangerouslySetInnerHTML={{ __html: content }} style={contentStyle} />
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
