import "./App.css"

export default function App() {

  const data = [
    { "postSeq": 1, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:10" },
    { "postSeq": 2, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:12" },
    { "postSeq": 3, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 4, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 5, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 6, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 7, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 8, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 9, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 10, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 11, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 12, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 13, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 14, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 15, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 16, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 17, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 18, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 19, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 20, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
    { "postSeq": 21, "postTitle": "게시글 제목", "writer": "관리자", "regDate": "2024-11-08 14:14" },
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
      <div className="postList">
        {data.map((item, index) => {
          return (<div className="postListItem" key={index}>{postItem(item)}</div>)
        })}
      </div>
    </>
  )
}
