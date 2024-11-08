import "./css/Header.css"

export default function Header() {
  return (
    <>

      <div className="headerBox">
        <img className="menuIcon" src="./src/assets/icons/menuIcon.png" />
        <h2>MindDraw</h2>
        <button className="btn btn-primary">글쓰기</button>
      </div>
    </>
  )
}
