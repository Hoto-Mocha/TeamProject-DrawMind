import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../../css/contentView.css";
import API from '../../API';
import toast, { toastConfig } from 'react-simple-toasts';

toastConfig({
    theme: 'dark',
});

function ContentView() {
    const postSeq = parseInt(useParams().postSeq);

    const [data, setData] = useState({})

    useEffect(() => {
        function getPostData() {
            API.postDetail(postSeq)
                .then((res) => {
                    if (res.data.body) {
                        let writer = res.data.body.writer
                        let date = res.data.body.regDate
                        let title = res.data.body.postTitle
                        let content = res.data.body.content
                        let imgURL = res.data.body.imgURL
                        let editorSize = res.data.body.postWidth - 2
                        setData({ writer, date, title, content, imgURL, editorSize })
                        console.log(data)
                    }
                    else {
                        toast('게시글 정보를 불러올 수 없었습니다.')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast('게시글 정보를 불러올 수 없었습니다.')
                })
        }
        getPostData()
    }, [])

    const [imageVisiblity, setImageVisiblity] = useState(true)

    const contentStyle = {
        width: data.editorSize
    }

    const imageStyle = {
        display: imageVisiblity ? "block" : "none",
    }

    const imageVisiblityBtnHandler = () => {
        setImageVisiblity(!imageVisiblity)
    }

    return (
        <div>
            {data && <div className='contentView'>
                <h1 className='contentView-title sidePadding'>{data.title}</h1>
                <div className='contentView-postInfo sidePadding'>
                    <p>{data.writer}</p>
                    <p>{data.date}</p>
                </div>
                <hr />
                <div className='contentView-content-container'>
                    <img className='contentView-image' src={data.imgURL} style={imageStyle}></img>
                    <div className='contentView-content sidePadding' dangerouslySetInnerHTML={{ __html: data.content }} style={contentStyle} />
                </div>
                <div>
                    {imageVisiblity && <button className='btn btn-primary nonSelect' onClick={imageVisiblityBtnHandler}>이미지 숨기기</button>}
                    {!imageVisiblity && <button className='btn btn-primary nonSelect' onClick={imageVisiblityBtnHandler}>이미지 보이기</button>}
                </div>
            </div>}
        </div>

    )
}

export default ContentView
