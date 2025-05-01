import React, { useState } from 'react'
import './CSS/Login.css'

const Login = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
  }

  const login = async () => {
    let responseData;

    await fetch("http://localhost:4000/api/users/loginadmin", {
      method: 'POST',
      headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then((response) => response.json())
    .then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
        setError(responseData.error);
    }
  }

  return (
    <div className="login">
        <div className="login-container">
          <h1>Login</h1>
          <div className="login-fields">
            <input type="email" name='email' onChange={changeHandler} placeholder='Email Address' />
            <input type="password" name='password' onChange={changeHandler} placeholder='Password' />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button onClick={() => {login()}}>Continue</button>
        </div>
    </div>
  )
}

export default Login