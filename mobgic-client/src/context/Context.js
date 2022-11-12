import React, { useContext, useState, createContext, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const APIContext = createContext();


export function APIContextProvider({ children }) {

  const baseUrl = "http://localhost:7000/";
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const registerUser = () => {
    const userData = {
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
      image: localStorage.getItem("image"),
    };
    try {
      axios
        .post(`${baseUrl}register`, userData)
        .then((res) => {
          navigate("/Dashboard");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          window.alert(`Registeration Failed`);
        });
    } catch (error) {
      window.alert(error.message);
    }
  };


  const postFiles = async (file) => {
  await axios.post(`${baseUrl}files/Post/${localStorage.getItem("email")}`, file).then((res) => {
        alert(JSON.stringify(`${res.data.message}, status: ${res.status}`));
        window.location.reload(true);
      }).catch((err) => {
        alert(JSON.stringify(`${err.message}, status: ${err.status}`));
      });
  };

  const getFiles = () => {
    axios.get(`${baseUrl}files/getFiles/${localStorage.getItem("email")}`)
      .then((result) => {
        console.log(result.data.message[0].files)
        setFiles(result.data.message[0].files.reverse())
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFiles = async(file)=>{
    await axios.delete(`${baseUrl}files/getFiles/${localStorage.getItem("email")}`)
    .then((result)=>{
      console.log("Delete Succesfull")
    }).catch((err)=>{
      console.log(err)
    })
  }

  const downloadFiles = async (name) => {
    saveAs(`${baseUrl}Files/${name}/${localStorage.getItem("email")}`);
    console.log(`${baseUrl}Files/${name}/${localStorage.getItem("email")}`)
  };

  useEffect(()=>{
    getFiles();
  },[])

  return ( <APIContext.Provider value={{files , getFiles , registerUser , postFiles, downloadFiles, setImage, image , deleteFiles}}>{children}</APIContext.Provider> );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
