import React, { useState } from 'react';
import { GoPasskeyFill } from "react-icons/go";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import '../../../node_modules/react-simple-toasts/dist/theme/dark.css';
import '../../css/InfoEdit.css';
import { handleLogout } from "../../components/common/Layout"
import API from '../../API';
import AlertModal from '../../components/common/AlertModal';
import ConfirmModal from '../../components/common/ConfirmModal';

toastConfig({
  theme: 'dark',
});

function InfoEdit() {
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

  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const confirmModalHandleClose = () => setConfirmModalShow(false);
  const confirmModalHandleShow = () => setConfirmModalShow(true);
  //모달 처리 부분 끝

  // 비밀번호 변경 버튼 눌렀을 때 이벤트
  const handleInfoEditBtn = () => {
    if (!(password && passwordConfirm)) {
      handleShow('모든 값을 채워주세요!')
      return
    }
    if (password != passwordConfirm) {
      handleShow('새 비밀번호와 새 비밀번호 확인 값은 같아야 합니다!')
      return
    }

    API.memberUpdate(localStorage.getItem('memberSeq'), password)
      .then((res) => {
        if (res.data.code === 0) {
          handleLogout()
          navigate('/login');
          toast('비밀번호가 변경되었습니다! 😊');
        }
        else {
          toast('비밀번호 변경에 실패했습니다.');
        }
      })
  };

  // 회원탈퇴 버튼 눌렀을 때 이벤트
  const handleQuitBtn = () => {
    API.memberQuit(localStorage.getItem('memberSeq'))
      .then((res) => {
        if (res.data.code === 0) {
          handleLogout();
          navigate('/');
          toast('회원탈퇴를 완료하였습니다.');
        }
        else {
          toast('회원탈퇴가 완료되지 않았습니다.')
        }
      })
      .catch((err) => {
        console.log(err)
        toast('회원탈퇴를 하지 못했습니다.')
      })
  };

  return (
    <>
      {/* 사람열쇠 아이콘 부분 */}
      <div className="infoEditHeader">
        <GoPasskeyFill style={{ width: '500px', height: '100px', color: 'skyblue' }} />
      </div>

      {/* 새 비밀번호 입력 부분 */}
      <div className="infoEditBody">
        <form className='infoEditForm'>
          <InputGroup size="sm" className="mb-3 infoEditInput">
            <Form.Control
              className='input'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='새 비밀번호'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3 infoEditInput">
            <Form.Control
              className='input'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='새 비밀번호 확인'
              type='password'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </InputGroup>
        </form>
      </div>

      {/* 비밀번호 변경 버튼 부분 */}
      <div className="infoEditFooter">
        <button className="btn btn-md infoEditBtn" onClick={handleInfoEditBtn}>비밀번호 변경</button>
        <button className="btn btn-md quit" onClick={confirmModalHandleShow}>회원탈퇴</button>
      </div>

      {/* 모달 */}
      <AlertModal
        show={modalShow}
        handleClose={handleClose}
        title={modalTitle}
        message={modalMsg}
      />
      <ConfirmModal
        show={confirmModalShow}
        handleClose={confirmModalHandleClose}
        title="정말로 탈퇴하시겠습니까?"
        message="회원 탈퇴 시 되돌릴 수 없습니다."
        noBtnMsg="취소"
        yesBtnMsg="확인"
        yesBtnHandler={handleQuitBtn}
      />
    </>
  );
}

export default InfoEdit;