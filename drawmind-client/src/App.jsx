import "./App.css"

export default function App() {

  const data = [
    { "postSeq": 1, "postTitle": "게시글 제목 1", "writer": "관리자", "regDate": "2024-11-08 14:10" },
    { "postSeq": 2, "postTitle": "게시글 제목 2", "writer": "관리자", "regDate": "2024-11-08 14:12" },
    { "postSeq": 3, "postTitle": "게시글 제목 3", "writer": "관리자", "regDate": "2024-11-08 14:14" }
  ]

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
      <div>
        {data.map((item, index) => {
          return (<div className="postListItem" key={index}>{postItem(item)}</div>)
        })}
      </div>
    </>
  )
}
