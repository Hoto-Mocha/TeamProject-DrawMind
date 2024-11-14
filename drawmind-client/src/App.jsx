import React, { useState, useEffect } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import API from "./API";
import "./App.css";

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
    return (
      <>
        <div className="infoSection">
          <p>{item.postTitle}</p>
          <p>{item.writer}</p>
        </div>
        <p>{item.regDate}</p>
      </>
    )
  }

  const testBtnHandler =  () => {
    API.test()
    .then((res) => {
      console.log(res.data)
    })
  }

  return (
    <>
      <div className="postList">
        {data.map((item, index) => {
          return (<div className="postListItem" key={index}>{postItem(item)}</div>)
        })}
        <button className="btn btn-primary" onClick={testBtnHandler}>API 테스트</button>
      </div>
    </>
  )
}