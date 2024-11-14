import React, { useState, useEffect } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import API from "./API";
import "./App.css";
import { Link } from 'react-router-dom';

toastConfig({
  theme: 'dark',
});

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    API.postList(currentPage)
    .then((res) => {
      const data = res.data.body;
      setData(data);
    })
    .catch((err) => {
      console.log(err);
      toast('게시글 목록을 불러올 수 없습니다.');
    });
  }, []);
  
  function postItem(item) {
    const writeDate = item.regDate.substring(0, 10)
    const writeTime = item.regDate.substring(11, 16)
    return (
      <>
        <div className="infoSection">
          <p>{item.postTitle}</p>
          <p>{item.writer}</p>
        </div>
        <p>{writeDate + ', ' + writeTime}</p>
      </>
    )
  }

  const testBtnHandler = () => {
    API.test()
    .then((res) => {
      console.log(res.data)
    })
  }

  const linkStyle = {
    textDecoration: "none",
    color: "black"
  }

  return (
    <>
      <div className="postList">
        {data.map((item, index) => {
          return (<Link to={`/contentView/${item.postSeq}`} className="postListItem" key={index} style={linkStyle}>{postItem(item)}</Link>)
        })}
        <button className="btn btn-primary" onClick={testBtnHandler}>API 테스트</button>
      </div>
    </>
  )
}