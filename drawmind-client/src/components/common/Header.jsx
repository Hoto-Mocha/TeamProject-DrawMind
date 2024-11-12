import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Header.css'
import { TfiMenuAlt } from "react-icons/tfi";
import { handleLogout } from "./Layout"

export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  return (
    <>
      <div className='header'>
        <div className='titleContainer'>
          <Link className='headerTitle' to='/'><img className='titleImage' src='./src/assets/icons/title.png'></img></Link>
        </div>
        <div className="headerBox">
          <TfiMenuAlt className="menuIcon" onClick={handleShow} />
          <Offcanvas show={show} onHide={handleClose} style={{ "width": "70%" }}>
            <Offcanvas.Header closeButton style={{ "borderBottom": "3px solid #333399", "backgroundColor": "#5454e2", "color":"white"}}>
              <Offcanvas.Title>메뉴</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ "padding": "0", "display": "flex", "flexDirection": "column" }}>
              {
                localStorage.getItem('id') ?
                (
                  <Link className='offBoxNav' to='/login' onClick={(e) => {handleClose(); e.preventDefault(); handleLogout(); navigate('/login')}}>로그아웃</Link>
                )
                :
                (
                  <Link className='offBoxNav' to='/login' onClick={handleClose}>로그인</Link>
                )
              }
              {
                (localStorage.getItem('id')) ?
                (
                  <Link className='offBoxNav' to='/infoEdit' onClick={handleClose}>회원 정보 수정</Link>
                )
                :
                (
                  <Link className='offBoxNav' to='/register' onClick={handleClose}>회원 가입</Link>
                )
              }
              {
                localStorage.getItem('id') &&
                (
                  <Link className='offBoxNav' to='/write' onClick={handleClose}>글쓰기(임시)</Link>
                )
              }
            </Offcanvas.Body>
          </Offcanvas>
          {/* <button className="btn btn-sm generalBtn">글쓰기</button> */}
        </div>
      </div>
    </>
  )
}
