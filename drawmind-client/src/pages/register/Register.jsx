import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import '../../../node_modules/react-simple-toasts/dist/theme/dark.css';
import '../../css/Register.css';
import API from '../../API';
import AlertModal from '../../components/common/AlertModal';

toastConfig({
  theme: 'dark',
});

function Register() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  let navigate = useNavigate();

  //모달 처리 부분
  const [modalShow, setModalShow] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [modalTitle, setModalTitle] = useState("경고");
  const handleClose = () => setModalShow(false);
  const handleShow = (message) => {
    setModalMsg(message)
    setModalShow(true)
  };
  //모달 처리 부분 끝

  // 회원가입 버튼 눌렀을 때 이벤트
  const handleRegisterBtn = () => {
    if (!(id && password && passwordConfirm)) {
      handleShow('모든 값을 채워주세요!')
      return
    }
    if (password != passwordConfirm) {
      handleShow('비밀번호와 비밀번호확인 값은 같아야 합니다!')
      return
    }

    API.memberJoin(id, password)
      .then((res) => {
        if (res.data.code === 0) {
          navigate('/login');
          toast('회원가입에 성공하였습니다! 😊');
        } else {
          toast('이미 가입된 ID입니다.');
        }
      })
      .catch((err) => {
        console.log(err)
        toast('회원가입에 실패했습니다.')
      })
  };

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
              type='text'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3 registerInput">
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

          <InputGroup size="sm" className="mb-3 loginInput">
            <Form.Control
              className='input'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='비밀번호 확인'
              type='password'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </InputGroup>
        </form>
      </div>

      {/* 로그인, 회원가입 버튼 부분 */}
      <div className='registerFooter'>
        <button className="btn btn-md registerBtn" onClick={handleRegisterBtn}>회원가입</button>
      </div>

      {/* 모달 */}
      <AlertModal show={modalShow} handleClose={handleClose} title={modalTitle} message={modalMsg} />
    </>
  );
}

export default Register;