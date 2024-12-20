import React, { useState, useEffect, useRef } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import API from "./API";
import "./css/App.css";
import rollingGif from "./images/Rolling.gif"
import { Link } from 'react-router-dom';

toastConfig({
    theme: 'dark',
});

export default function App() {
    const nextPageRef = useRef(0);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("isMainPage", true) 
        }, 1000);

        return () => {localStorage.setItem("isMainPage", false)}
    }, [])

    useEffect(() => {
        if (isRefresh) {
            loadPage();
        } else if (!loading && !isLastPage) {
            loadPage();
            const handleScroll = () => {
                loadPage();
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isRefresh, loading]);


    function isScrollEnd() {
        return window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10 //현재 화면의 맨 아래 가장자리가 페이지 맨 아래보다 0px 위 이내인 경우를 뜻함
    }

    function loadFirstPage() {
        setPosts([])
        setIsRefresh(true);
        setIsLastPage(false);
        nextPageRef.current = 0
        loadPage()
    }

    function loadPage() {
        if (isScrollEnd() || isRefresh) {
            setLoading(true);

            new Promise(resolve => {
                resolve(
                    API.postList(nextPageRef.current)
                        .then((res) => {
                            const postList = res.data.body;
                            if (postList.length > 0) {
                                setPosts((prevPosts) => [...prevPosts, ...postList])
                                nextPageRef.current += 1
                            } else {
                                setIsLastPage(true)
                                toast('마지막 페이지입니다.')
                            }

                            setTimeout(() => {
                                setLoading(false)
                            }, 500)
                        })
                        .catch((err) => {
                            console.log(err);
                            setIsLastPage(true)
                            toast('게시글 목록을 불러올 수 없습니다.');

                            setTimeout(() => {
                                setLoading(false)
                            }, 500)
                        })
                )
            });
            setIsRefresh(false);
        }
    }


    function postItem(item) {
        const writeDate = item.regDate.substring(0, 10)
        const writeTime = item.regDate.substring(11, 16)
        return (
            <>
                <div className="infoSection">
                    <div className='infoTitle'>
                        <p>{item.postTitle}</p>
                    </div>
                    <div className='infoContent'>
                        <p>{item.writer}</p>
                        <p>{writeDate + ', ' + writeTime}</p>
                    </div>
                </div>

            </>
        )
    }

    const linkStyle = {
        textDecoration: "none",
        color: "black"
    }

    return (
        <>
            <div className='refreshBtnContainer'>
                <button className='btn btn-primary btn-sm' onClick={loadFirstPage}>새로고침</button>
            </div>
            <div className="postList">
                {posts.map((item, index) => {
                    return (<Link to={`/contentView/${item.postSeq}`} className="postListItem" key={index}
                        style={linkStyle}>{postItem(item)}</Link>)
                })}
                {/* <button className="btn btn-primary" onClick={testBtnHandler}>API 테스트</button> */}
            </div>
            {!isLastPage && loading && <div className='app-loading'>
                <img src={rollingGif} style={{ width: '5vw', height: '5vw' }} />
            </div>}
        </>
    )
}