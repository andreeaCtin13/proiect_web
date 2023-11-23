import React from "react";
import style from "../../styles/student/CurrentStatusPage.module.css";
import Phase1 from "../../components/Student/Phase1";
import Phase2 from "../../components/Student/Phase2";
import Phase3 from "../../components/Student/Phase3";
import Phase4 from "../../components/Student/Phase4";



function CurrentStatusPage() {
  const profesor = "Toma Cristian";
  const statusList = ["pending", "accepted","loading", "final", "refused"]
  const status = statusList[3]
  return (
    <div className={style.mainContainer}>
      <h1 className={style.h1}>Your current status</h1>
      {profesor==null?<Phase1></Phase1>:(status=="accepted"?<Phase2></Phase2>:(status=="loading"? <Phase3></Phase3>:<Phase4></Phase4>))}
    </div>
  );
}

export default CurrentStatusPage;
