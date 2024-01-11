import React from "react";
import style from "../../styles/student/CurrentStatusPage.module.css";
import Button from "../General/Button";
import Cheers from "../../images/cheers.png"
import axios from "axios"
function Phase4() {
  const downloadFile = async(e) =>{
    e.preventDefault()

    try{
      const response = await axios.get("http://localhost:9000/requests/getFilePath/1")
      console.log(response.data)
      let name = response.data.split("\\")
      console.log(name[2])
      window.open(`http://localhost:9000/${name[2]}`, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  }

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
            <Button content="Download signed form" className={style.btn} onClick={downloadFile}></Button>
        </div>
      </div>
    </div>
  );
}

export default Phase4;
