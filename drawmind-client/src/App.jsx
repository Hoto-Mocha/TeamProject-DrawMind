import "./App.css"
import {useNavigate} from "react-router-dom";

export default function App() {

  const data = [
    { "postSeq": 1, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:10" },
  ]

  const navigator = useNavigate()

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

  return (
    <>
      <div className="postList">
        {data.map((item, index) => {
          return (<div className="postListItem" key={index}>{postItem(item)}</div>)
        })}
      </div>
    </>
  )
}
