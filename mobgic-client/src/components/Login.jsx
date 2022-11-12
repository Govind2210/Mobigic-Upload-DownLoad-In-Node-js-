import React,{useEffect , useState} from "react";
import { useAPI } from "../context/Context";
import { useNavigate , Link  } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = () => {
  const { registerUser } = useAPI();
  const myClientId ="214557235352-qe85f5rptce30ush1hele2huib9g8vne.apps.googleusercontent.com";
  
  const onLoginSuccess = (res) => {
    console.log(res);
    const userObject=jwt_decode(res.credential)
    console.log(userObject);
    localStorage.setItem("email", userObject.email);
    localStorage.setItem("name", userObject.name);
    localStorage.setItem("image", userObject.picture);
    registerUser();
  };

  const [email , setEmail] =useState("")
  const [Password , setPassword] =useState("")

  const navigate = useNavigate()


  const collectData = async ()=>{
    // console.log( email , Password)
    
    let result = await fetch("http://localhost:7000/api/mylogin" , {
      method : "post",
      body : JSON.stringify({email , Password}),
      headers :{
        'Content-Type'  : 'application/json'
      }
    })
    result = await result.json();
    console.log(result)
    if(result.message == "User signIn Sucessfully" ){
      localStorage.setItem("email" , JSON.stringify(result.email))
      navigate("/Dashboard")
    }
    else{
      console.log("error")
    }
  }

  useEffect(() => {
    try {
      setTimeout(()=>{
      /* global google */
        google.accounts.id.initialize({
          client_id:myClientId,
          callback:onLoginSuccess,
        });
        google.accounts.id.renderButton(
          document.getElementById("signinDiv"),
          {theme:"outLine",size:"large"}
        )
      },500);
    } catch (error) {
      alert("Please Reload");
    }
    }, []);

  return (
    <>
      <div className="MYcontainer">
        <div>
          <h1>Login</h1>
        </div>
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
          <button onClick={collectData} className="MYappButton">Log IN</button>
        </div>
      </div>
      <div id="signinDiv"></div>
      <div className="MYanotherdiv">
        <p>don't have account? </p>
        <Link to='/Signup'>Sign-up</Link>
      </div>
    </>
  );
};

export default Login;
