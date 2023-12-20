import React from "react";
import style from "../../styles/student/CurrentStatusPage.module.css";
import Button from "../General/Button";
import Cheers from "../../images/cheers.png"
function Phase4() {
  return (
    <div className={style.flexPhase4}>
        <div>
        <img src={Cheers} alt="cheers" className={style.cheersImage} />
        </div>
      <div className={style.containerPhase4}>
        <h2 className={style.h2}>
          Congrats, your teacher uploaded the form signed!!! Goodluck with your
          disertation!!!
        </h2>
        <div>
            <Button content="Download signed form" className={style.btn}></Button>
        </div>
      </div>
    </div>
  );
}

export default Phase4;
