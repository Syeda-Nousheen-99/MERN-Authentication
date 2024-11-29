import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginpInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginpInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);

  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginpInfo;
    if (!email || !password) {
      return handleError('Somrthing went wrong')
    }

    try {
      const url = "https://mern-authentication-api-mu.vercel.app/auth/login"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginpInfo)
      })
      const result = await response.json();
      const { success, message,name, jwtToken, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('LoggedInUser', name)
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      } else if(error){
        const details = error?.details[0].message;
        handleError(details)
      }else if(!success){
        handleError(message)
      }
      console.log(result);

    } catch (err) {
      handleError(err);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="signup-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} value={loginpInfo.email} type="email" name="email" placeholder="Enter Your Email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              value={loginpInfo.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Your Password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button type="submit" className="signup-button">Login</button>
        <span className="login-redirect">
          Create an Account? then <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
