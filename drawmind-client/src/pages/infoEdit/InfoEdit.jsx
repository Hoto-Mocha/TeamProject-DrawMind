import React, { useState } from 'react';
import { GoPasskeyFill } from "react-icons/go";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import '../../../node_modules/react-simple-toasts/dist/theme/dark.css';
import '../../css/InfoEdit.css';

toastConfig({ 
  theme: 'dark',
});

function InfoEdit() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  let navigate = useNavigate();
  
  // 비밀번호 변경 버튼 눌렀을 때 이벤트
  const handleInfoEditBtn = () => {
    if (!(password && passwordConfirm)) {
      return alert('모든 값을 채워주세요!');
    }
    if (password != passwordConfirm) {
      return alert('새 비밀번호와 새 비밀번호 확인 값은 같아야 합니다!');
    }
    
    navigate('/login');
    toast('비밀번호가 변경되었습니다! 😊');
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
      </div>
    </>
  );
}

export default InfoEdit;