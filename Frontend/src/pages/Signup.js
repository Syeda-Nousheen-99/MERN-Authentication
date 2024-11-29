import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);

  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Somrthing went wrong')
    }

    try {
      const url = "https://mern-authentication-api-mu.vercel.app/auth/signup"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
        },1000)
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details)
      } else if (!success) {
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
      <div className=' head'>
        <h1>Sign Up</h1>
        <div className='container'>
          <form onSubmit={handleSignup} className="signup-form">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input onChange={handleChange} value={signupInfo.name} type="text" name="name" placeholder="Enter Your Name" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} value={signupInfo.email} type="email" name="email" placeholder="Enter Your Email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  value={signupInfo.password}
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
            <button type="submit" className="signup-button">Sign Up</button>
            <span className="login-redirect">
              Already have an Account? <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
        </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
