import React from 'react';
import { FaKey } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Login.css';

function Login() {
  return (
    <>
      {/* 열쇠 아이콘 부분 */}
      <div className='loginHeader'>
        <FaKey style={{ width: '500px', height: '100px', color: 'skyblue' }} />
      </div>

      {/* 아이디, 비밀번호 입력 부분 */}
      <div className='loginBody'>
        <InputGroup size="sm" className="mb-3" style={{ border: '1px solid #BDBDBD', width: '70%' }}>
          <Form.Control
            className='input'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder='아이디'
          />
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{ border: '1px solid #BDBDBD', width: '70%' }}>
          <Form.Control
            className='input'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder='비밀번호'
            type='password'
          />
        </InputGroup>
      </div>

      {/* 로그인, 회원가입 버튼 부분 */}
      <div className='loginFooter'>
        <button className="btn btn-md loginBtn">로그인</button>
        <button className="btn btn-md registerBtn">회원가입</button>
      </div>
    </>
  );
}

export default Login;