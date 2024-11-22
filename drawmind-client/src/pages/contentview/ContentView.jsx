import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../../css/contentView.css";
import API from '../../API';
import toast, { toastConfig } from 'react-simple-toasts';
import ConfirmModal from '../../components/common/ConfirmModal';

toastConfig({
    theme: 'dark',
});

function ContentView() {
    const postSeq = parseInt(useParams().postSeq);

    const [data, setData] = useState({})

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        function getPostData() {
            API.postDetail(postSeq)
                .then((res) => {
                    if (res.data.body) {
                        let writer = res.data.body.writer
                        let date = res.data.body.regDate.substring(0, 10) + ', ' + res.data.body.regDate.substring(11, 16)
                        let title = res.data.body.postTitle
                        let content = res.data.body.content
                        let imgURL = res.data.body.imgURL
                        let editorSize = res.data.body.postWidth - 2
                        setData({ writer, date, title, content, imgURL, editorSize })
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

    const postDeleteHandler = () => {
        API.postDelete(postSeq)
            .then((res) => {
                if (res.data.code === 0) {
                    toast('게시글 삭제가 완료되었습니다.')
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err)
                toast('게시글을 삭제할 수 없었습니다.')
            })
    }

    function isWriter() {
        const writer = JSON.stringify(data.writer)
        return writer === localStorage.getItem('memberId')
    }

    const editBtnHandler = (data) => {
        const postData = {
            title: data.title,
            content: data.content,
            postSeq: postSeq,
            imgURL: data.imgURL,
            editorSize: data.editorSize
        }
        navigate('/edit', { state: postData })
    }

    return (
        <div>
            {data && <div className='contentView'>
                <div className='contentView-post-header'>
                    <div className='contentView-post-title-container'>
                        <h1 className='contentView-title sidePadding'>{data.title}</h1>
                    </div>
                    <div className='contentView-postInfo sidePadding'>
                        <p>{data.writer}</p>
                        <p>{data.date}</p>
                    </div>
                    {isWriter() && <div className='btnContainer'>
                        <button className='btn btn-danger contentview-btn' onClick={handleShow}>삭제</button>
                        <button className='btn btn-primary contentview-btn' onClick={() => { editBtnHandler(data) }}>수정</button>
                    </div>}
                    <hr />
                </div>
                <div className='contentview-body'>
                    <div className='contentView-content-container'>
                        <img className='contentView-image' src={data.imgURL} style={imageStyle}></img>
                        <div className='contentView-content sidePadding innerHtml' dangerouslySetInnerHTML={{ __html: data.content }} style={contentStyle} />
                    </div>
                    <div>
                        {imageVisiblity && <button className='btn btn-primary nonSelect' onClick={imageVisiblityBtnHandler}>이미지 숨기기</button>}
                        {!imageVisiblity && <button className='btn btn-primary nonSelect' onClick={imageVisiblityBtnHandler}>이미지 보이기</button>}
                    </div>
                </div>
            </div>}
            <ConfirmModal
                show={show}
                handleClose={handleClose}
                title="게시글을 삭제하시겠습니까?"
                message="게시글을 삭제하면 되돌릴 수 없습니다."
                noBtnMsg="취소"
                yesBtnMsg="확인"
                yesBtnHandler={postDeleteHandler}
            />
        </div>

    )
}

export default ContentView
