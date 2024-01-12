import React, { useEffect, useState } from "react";
import style from "../../styles/student/CurrentStatusPage.module.css";
import Phase1 from "../../components/Student/Phase1";
import Phase2 from "../../components/Student/Phase2";
import Phase3 from "../../components/Student/Phase3";
import Phase4 from "../../components/Student/Phase4";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import axios from "axios"

function CurrentStatusPage() {
  const { globalUser, setGlobalUser } = useContext(UserContext);

  const [status, setStatus] = useState("pending")
  const [reqId,setReqId] = useState()


  const GetReq = async() => {
    if(globalUser.id_profesor_asociat!==null){
      const req = await axios.get(`http://localhost:9000/requests/findAcceptedRequestOfAStudent/${globalUser.idUser}`)
      console.log(req)
      setStatus(req.data.status)
      setReqId(req.data.id_request)
    }
  }

  const UpdateUser = async() => {
    const userUpdated = await axios.get(`http://localhost:9000/users/getUserByID/${globalUser.idUser}`)
    setGlobalUser(userUpdated.data.user)

  }
  useEffect(()=>{
    UpdateUser()
    GetReq()
  },[])
console.log("ID", globalUser)
  return (
    <div className={style.mainContainer}>
      <h1 className={style.h1}>Your current status</h1>
      {globalUser.id_profesor_asociat===null?<Phase1></Phase1>:(status==="accepted"?<Phase2 reqId={reqId} setReqId={setReqId}></Phase2>:(status==="loading"? <Phase3></Phase3>:<Phase4></Phase4>))}
    </div>
  );
}

export default CurrentStatusPage;