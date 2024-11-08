import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./Header.css"
import { TfiMenuAlt } from "react-icons/tfi";

export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="headerBox">
        <TfiMenuAlt className="menuIcon" onClick={handleShow} />
        <Offcanvas show={show} onHide={handleClose} style={{ "width": "70%" }}>
          <Offcanvas.Header closeButton style={{ "borderBottom": "3px solid gray", "backgroundColor": "lightGray" }}>
            <Offcanvas.Title>메뉴</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ "padding": "0", "display": "flex", "flexDirection": "column" }}>
            <Link className='offBoxNav' to='/login' onClick={handleClose}>로그인</Link>
            <Link className='offBoxNav' to='/register' onClick={handleClose}>회원 가입</Link>
          </Offcanvas.Body>
        </Offcanvas>
        <button className="btn btn-sm generalBtn">글쓰기</button>
      </div>
      <div className='titleContainer'>
        <Link className='headerTitle' to='/'><h2>MindDraw</h2></Link>
      </div>
    </>
  )
}