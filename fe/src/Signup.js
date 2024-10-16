import React, { useState, useEffect } from 'react'
import { json, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';


function Signup() {

  //2 create states to get values from form
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState();
  const [role, setRole] = useState();

  /*const navigate = useNavigate(); //9 use navigate
  useEffect(()=>{ //Redirecting the authenticated user to add page instead of register page
    if(localStorage.getItem('user-info')){
      navigate("/add");
    }
  },[])*/

  async function Register() {
    //4 putting the values into an object
    let item = { name, email, role, password };
    //5 passing the obj to the backend to fetch the task and taking the response in a promise
    let result = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { //type of data for request and response
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    result = await result.json() //7 turing the result promise into json format
    setErrors(result["errors"]);
    setMessage(result["message"]);
  }

  return (
    <div>
      <Navigation />
      {/* 1 register form */}
      <div className='col-sm-6 offset-sm-3'>
        <h1>Register Page</h1>
        {
          errors ? (<div className='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}> {errors[key][0]} </p>
            ))}
          </div>)
            :
            (
              message && <div>
                <p >{message}</p>
              </div>
            )
        }
        {/* 3 getting form input values using states */}
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='form-control' placeholder='Name' /><br />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' /><br />
        <select name="roles" id="roles" value={role} onChange={(e) => setRole(e.target.value)} className='form-control'>
          <option value="" disabled selected>Choose Account Role</option>
          <option value="inv_mng">Invoice Manager</option>
          <option value="p&c_mng">Product and Client Manager</option>
          <option value="admin">Admin</option>
        </select><br />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' /><br />
        <button onClick={Register} className='btn btn-primary'>Sign up</button>
      </div>
    </div>
  )
}

export default Signup