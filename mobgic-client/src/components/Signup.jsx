import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';

function Signup() {

  const [name , setName] =useState("")
  const [email , setEmail] =useState("")
  const [Password , setPassword] =useState("")

  const navigate = useNavigate()

  const collectData = async ()=>{
    console.log(name , email , Password)
    let result = await fetch("http://localhost:7000/api/signup" , {
      method: 'post',
      body: JSON.stringify({name , email , Password}),
      headers :{
        'Content-Type'  : 'application/json'
      }
    });
    result = await result.json()
    console.log(result)
    localStorage.setItem("email" , JSON.stringify(result.email))
    navigate("/" );  
}

  return (
    <>
      <div className="MYcontainer">
        <div>
          <h1>Signup</h1>
        </div>
        <div>
          <input type="text" className="MYinput-box"
          value={name} onChange={(e)=>setName(e.target.value)}
          placeholder="Enter Name" />
        </div><br></br>
        <div>
          <input type="text" className="MYinput-box"
          value={email} onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter Email" />
        </div><br></br>
        <div>
          <input type="password" className="MYinput-box" 
          value={Password} onChange={(e)=>setPassword(e.target.value)}
          placeholder="Enter Password" />
        </div><br></br>
        <div>
          <button onClick={collectData} className="MYappButton">Sign up</button>
        </div>
      </div>
    </>
  );
}

export default Signup;
