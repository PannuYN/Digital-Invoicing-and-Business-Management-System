import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');

  async function login() {
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(item)
    });
    result = await result.json();
    setMessage(result.message);
    setErrors(result.errors);
    localStorage.setItem("authenticated", result.role);
    localStorage.setItem("user", result.name );
    localStorage.setItem("email", result.email);
    if (localStorage.getItem("authenticated")!=="undefined"){
      window.location.href= "/#";
    }
  }

  /*useEffect(() => { //Redirecting the authenticated user to add page instead of login page
    if (localStorage.getItem("authenticated")) {
      redirect('/#');
    }
  }, []);*/

  return (
    <div>
      <Navigation />
      <br></br>
      <h2>Login Here</h2><br/>
      {errors ? (
        <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key} style={{color: "red"}}> {errors[key][0]} </p>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: "400px" }}>
          <input
            type="email"
            placeholder='email'
            className='form-control'
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder='password'
            className='form-control'
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button onClick={login} style={{backgroundColor: "#027265"}} className='btn btn-primary'>Login</button>
          <br></br><br></br>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        
      </div>
    </div>
  )
}

export default Login;
