import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';


const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserEmail } = useUser();
  const history = useNavigate();



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let userData = {
      email: email,
      password: password
    }
    let res = await fetch("http://localhost:5000/api/v1/registration", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    let data = await res.json()
    console.log(data);
    if (Array.isArray(data)) {
      alert(data[0].msg);
    } else {
      if (data.hasOwnProperty("msg")) {
        alert(data.msg)
      } else {
        setUserEmail(email);
        history("/home")
      }
    }


  };

  return (
    <div className='body'>
      <div className="login-form">
        <form onSubmit={handleRegister}>
          <h1>Registration</h1>
          <div className="content">
            <div className="input-field">
              <input type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder='Email'
                required
              />
            </div>
            <div className="input-field">
              <input type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder='password'
                required
              />
            </div>

          </div>
          <div className="havent-reg" onClick={() => { history("/") }}>Already Log in?</div>
          <div className="action">
            {/* <button>Register</button> */}
            <button>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
