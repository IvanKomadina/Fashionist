import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = useState("Login")
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const login = async () => {
    let responseData;

    await fetch("http://localhost:4000/api/users/login", {
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

  const signup = async () => {
    let responseData;

    await fetch("http://localhost:4000/api/users/signup", {
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
    <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === "Sign Up" ? <input type="text" name='name' value={formData.name} onChange={changeHandler} placeholder='Your Name' /> : <></>}
            <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
            <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
          </div>
          {error && <p className="loginsignup-error">{error}</p>} 
          <button onClick={() => {state === "Login" ? login() : signup()}}>Continue</button>
          {state === "Sign Up" ? 
          <p className="loginsignup-login">Already have an account? <span onClick={() => setState("Login")}>Login here</span></p> : 
          <p className="loginsignup-login">You don't have an account? <span onClick={() => setState("Sign Up")}>Click here</span></p>}
        </div>
    </div>
  )
}

export default LoginSignup