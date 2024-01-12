import React, { useEffect, useState } from 'react'
import style from "../../styles/student/CurrentStatusPage.module.css";
import Button  from '../../components/General/Button';
import axios from "axios"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Phase2({reqId, setReqId, idProf}) {
  const [file, setFile] = useState();
  const [teacher, setTeacher] = useState("")
  console.log(reqId)

  const getName = async()=>{
    console.log(idProf)
    const data = await axios.get(`http://localhost:9000/users/getUserByID/${idProf}`)
    console.log("DATA", data)
    setTeacher(data.data.user.nume)
  }
  useEffect(()=>{
    getName()
  })


  const sendFile = async() =>{
    const formData = new FormData();
    formData.append("file", file);
    await axios
      .post(`http://localhost:9000/requests/uploadFile/${reqId}`, formData)
      .then((res) => {
        console.log(res.status)
        toast.success("🦄 Your file has been uploaded", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((er) => {
        toast.error("Sorry, but there was an error, please try again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(er)
      });
  }
  return (
    <div>
      <h2 className={style.h2}>Congrats!!! {teacher} accepted your request. It's time for paperwork!!! </h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button content={"Upload your form"} className={style.btn} onClick={sendFile}></Button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default Phase2
