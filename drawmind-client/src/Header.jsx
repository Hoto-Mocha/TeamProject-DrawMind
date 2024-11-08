import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./css/Header.css"

export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <div className="headerBox">
        <img className="menuIcon" src="./src/assets/icons/menuIcon.png" onClick={handleShow} />
        <Offcanvas show={show} onHide={handleClose} style={{"width":"70%"}}>
          <Offcanvas.Header closeButton style={{"borderBottom":"3px solid green"}}>
            <Offcanvas.Title>메뉴</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{"padding":"0"}}>
            <div className='offBoxNav'>
              <a href="/">로그인</a>
            </div>
            <div className='offBoxNav'>
              <a href="/">회원 가입</a>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <h2>MindDraw</h2>
        <button className="btn btn-sm generalBtn">글쓰기</button>
      </div>
    </>
  )
}