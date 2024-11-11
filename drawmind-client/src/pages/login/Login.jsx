import React from 'react';
import { FaKey } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      {/* 열쇠 아이콘 부분 */}
      <div className='loginHeader'>
        <FaKey style={{ width: '500px', height: '100px', color: 'skyblue' }} />
      </div>

      {/* 아이디, 비밀번호 입력 부분 */}
      <div className='loginBody'>
        <form className='loginForm'>
          <InputGroup size="sm" className="mb-3 loginInput">
            <Form.Control
              className='input'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='아이디'
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3 loginInput">
            <Form.Control
              className='input'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='비밀번호'
              type='password'
            />
          </InputGroup>
        </form>
      </div>

      {/* 로그인, 회원가입 버튼 부분 */}
      <div className='loginFooter'>
        <button className="btn btn-md loginBtn">로그인</button>
        <Link to='/register' className="btn btn-md registerBtn">회원가입</Link>
      </div>
    </>
  );
}

export default Login;