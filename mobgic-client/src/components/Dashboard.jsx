import React,{ useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../context/Context";

const Dashboard = () => {
  const { postFiles, getFiles, files, downloadFiles, image , setImage } = useAPI();
  const navigate = useNavigate();
  const [number, setNumber] = useState(1);
  const filesPerPage = 6;
  const lastfile = number * filesPerPage;
  const firstfile = lastfile - filesPerPage;
  const currentfiles = files.slice(firstfile, lastfile);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(files.length / filesPerPage); i++) pageNumber.push(i);

  const onLogOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(true);
    console.log(`LogOut Sucess`);
  };

  useEffect(() => {
   setImage(localStorage.getItem("image"));
  }, []);

  const handleDownload = async (name) => {
    let same = prompt("Please enter your CODE")
    let length = same.length < 5
    if(same == null){
      alert("Please Try Again")
    }
    else if(length ){
      alert("The CODE is Incorrect")
    }
    else{
      await downloadFiles(name);
    }
  };

  const ChangePage = (pageNumber) => {
    const maxPage=Math.ceil(files.length / filesPerPage);
    if(pageNumber!==0 && pageNumber <= maxPage){
      setNumber(pageNumber);
    }else{
      alert("Page Limit Exceeded")
    }
  };

 let  x = Math.floor((Math.random() * 1000000) + 6)
  const uploadFile=(e)=>{
      let file = e.target.files[0];
      if (file) {
        let data = new FormData();
        if(data){
          alert("Save this CODE " + x)
        }
        data.append('file', file);
        postFiles(data);
        getFiles();
      }
  }

  const handleAllclear = () =>{
    console.log("deleting")
  }


  return (
    <div className="container">

      <div className="user">
        <img alt="Profile" src={image!=="" ? image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="image"/>
        <div className="name" >{localStorage.getItem("name")}</div>
        <button onClick={onLogOut} className="logout-with-google-btn">Logout</button>
      </div>

      <div className="main">
        <h1>Upload Your Files Here</h1>
        <input type="file" name="myFile" className="custom-file-input" onChange={uploadFile} />
        <div className="data">
          {currentfiles.map((each, i) => { return ( <div className="item" key={i} onClick={() => handleDownload(each.code)}> <p>{each.name}</p> </div>)})}
        </div>

        <div className="paginate">
            <button className="paginatebtn" onClick={() => ChangePage(number - 1)}>Previous</button>
              {pageNumber.map((Elem,i) => { return (<> <button key={i} className="paginatebtn" onClick={() => ChangePage(Elem)}> {Elem} </button></>) })}
            <button className="paginatebtn" onClick={() => ChangePage(number + 1)}>Next</button> 
            <button className="paginatebtn" onClick={handleAllclear}>Clear</button>       
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
