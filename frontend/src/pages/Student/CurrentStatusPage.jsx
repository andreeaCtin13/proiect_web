import React, { useEffect } from "react";
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

  const statusList = ["pending", "accepted","loading", "final", "refused"]
  const status = statusList[1]
  console.log("global user", globalUser)

  const UpdateUser = async() => {
    const userUpdated = await axios.get(`http://localhost:9000/users/getUserByID/${globalUser.idUser}`)
    setGlobalUser(userUpdated)
  }
  console.log(globalUser)
  useEffect(()=>{
    UpdateUser()
  },[])

  return (
    <div className={style.mainContainer}>
      <h1 className={style.h1}>Your current status</h1>
      {globalUser.id_profesor_asociat===null?<Phase1></Phase1>:(status==="accepted"?<Phase2></Phase2>:(status==="loading"? <Phase3></Phase3>:<Phase4></Phase4>))}
    </div>
  );
}

export default CurrentStatusPage;