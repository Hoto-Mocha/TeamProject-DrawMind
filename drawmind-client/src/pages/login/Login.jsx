import React, { useState } from 'react';
import { FaKey } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/Login.css';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  // 로그인 버튼 눌렀을 때 이벤트
  const handleLoginBtn = () => {
    if (!(id && password)) {
      return alert('아이디 또는 비밀번호를 입력해주세요!');
    }

    localStorage.setItem('id', id);

    navigate('/');
  };

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
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3 loginInput">
            <Form.Control
              className='input'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='비밀번호'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </form>
      </div>

      {/* 로그인, 회원가입 버튼 부분 */}
      <div className='loginFooter'>
        <button className="btn btn-md loginBtn" onClick={handleLoginBtn}>로그인</button>
        <Link to='/register' className="btn btn-md registerBtn">회원가입</Link>
      </div>
    </>
  );
}

export default Login;