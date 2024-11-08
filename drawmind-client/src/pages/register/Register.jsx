import React from 'react';
import { FaUser } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Register.css';

function Register() {
  return (
    <>
      {/* 열쇠 아이콘 부분 */}
      <div className='registerHeader'>
        <FaUser style={{ width: '500px', height: '100px', color: 'skyblue' }} />
      </div>

      {/* 아이디, 비밀번호 입력 부분 */}
      <div className='registerBody'>
        <form className='registerForm'>
          <InputGroup size="sm" className="mb-3 registerInput">
            <Form.Control
              className='input'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='아이디'
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3 registerInput">
            <Form.Control
              className='input'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='비밀번호'
              type='password'
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3 loginInput">
            <Form.Control
              className='input'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='비밀번호 확인'
              type='password'
            />
          </InputGroup>
        </form>
      </div>

      {/* 로그인, 회원가입 버튼 부분 */}
      <div className='registerFooter'>
        <button className="btn btn-md registerBtn">회원가입</button>
      </div>
    </>
  );
}

export default Register;