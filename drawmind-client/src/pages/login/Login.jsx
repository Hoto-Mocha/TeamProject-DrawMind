import React from 'react';
import { FaKey } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Login.css';

function Login() {
  return (
    <>
      <div className='loginHeader'>
        <FaKey style={{ width: '500px', height: '100px', color: 'skyblue' }} />
      </div>
      <div className='loginBody'>
        <InputGroup size="sm" className="mb-3" style={{ border: '1px solid #BDBDBD', width: '70%' }}>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>
      <div className='loginFooter'>
        
      </div>
    </>
  );
}

export default Login;