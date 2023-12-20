import React from "react";
import LoadingAnimation from "../../components/General/LoadingAnimation";
import style from "../../styles/student/CurrentStatusPage.module.css";
function Phase3() {
  const teacher = "Toma Cristian";

  return (
    <div>
      <h2 className={style.h2}>
        Your file has been sent!!! Now, wait for {teacher} to accept it
      </h2>
      <LoadingAnimation></LoadingAnimation>
    </div>
  );
}

export default Phase3;
