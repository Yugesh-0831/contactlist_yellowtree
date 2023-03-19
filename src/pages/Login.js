import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Login() {

    const {loginUser} = useContext(AuthContext);

    const [credential,setCredentials] = useState({
        username : "",
        password: ""
    })

const handelInputChange = (event)=>{
    const {name,value} = event.target;

    setCredentials({...credential,[name]: value})
}

const handleSubmit= (event) =>{
    event.preventDefault();
    // console.log(credential);
    loginUser(credential);
}


  return (
      <div className="flex justify-center items-center h-screen bg-indigo-600">
          <div className="w-96 p-6 shadow-lg bg-white rounded-md">
              <h1 className="text-center font-semibold text-3xl">Login</h1>
              <hr className="mt-3" />
              <form onSubmit={handleSubmit}>
              <div className="mt-3">
                  <label htmlFor="username" className="block text-base mb-2">Username</label>
                  <input value ={credential.username} onChange={handelInputChange} required 
                  name ="username" type="text" placeholder ="enter your username" id="username" className="border w-full px-2 py-1 focus:outline-none 
                  rounded-md focus:border-gray-600" />
                  </div>
              <div className="mt-3">
                  <label htmlFor="password" className="block text-base mb-2">Password</label>
                  <input type="text" value ={credential.password} onChange={handelInputChange} required
                  name="password" id="password" placeholder="enter your password" className="border w-full px-2 py-1 focus:outline-none 
                  rounded-md focus:border-gray-600" />
                  </div>
                  <div className="mt-7">
                      <button onSubmit={handleSubmit} type="submit" className="border-2 border-indigo-600 bg-indigo-600 text-white py-1 w-full hover:bg-transparent 
                      hover:text-indigo-600 rounded-md">Login</button>
                  </div>
                  </form>
                  <div className="pt-4 flex justify-between">
                      <p>Don't have an account?</p>
                      <Link to="/Register">Create One</Link> 
                  </div>
          </div>
    </div>
  )
}

export default Login
