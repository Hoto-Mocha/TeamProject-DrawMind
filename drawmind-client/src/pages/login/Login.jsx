import React, { useState } from 'react';
import { FaKey } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/Login.css';
import API from '../../API';
import AlertModal from '../../components/common/AlertModal';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();
  
  //모달 처리 부분
  const [modalShow, setModalShow] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [modalTitle, setModalTitle] = useState("경고");
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  //모달 처리 부분 끝

  // 로그인 버튼 눌렀을 때 이벤트
  const handleLoginBtn = () => {
    if (!(id && password)) {
      setModalMsg('아이디 또는 비밀번호를 입력해주세요!')
      handleShow()
      return
    }

    API.memberLogin(id, password)
      .then((res) => {
        console.log(res.data)

        if (res.data.code === 0) {
          localStorage.setItem('memberSeq', JSON.stringify(res.data.body.memberSeq));
          localStorage.setItem('memberId', JSON.stringify(res.data.body.memberId));

          navigate('/');
        }
        else {
          setModalMsg('아이디 또는 비밀번호가 맞지 않습니다.')
          handleShow()
          return
        }

      })
      .catch((err) => {

      })
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

      {/* 모달 */}
      <AlertModal show={modalShow} handleClose={handleClose} title={modalTitle} message={modalMsg}/>
    </>
  );
}

export default Login;
