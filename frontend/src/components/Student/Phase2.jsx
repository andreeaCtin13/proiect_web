import React from 'react'
import style from "../../styles/student/CurrentStatusPage.module.css";
import Button  from '../../components/General/Button';

function Phase2() {
  const teacher="Toma Cristian";
  return (
    <div>
      <h2 className={style.h2}>Congrats!!! {teacher} accepted your request. It's time for paperwork!!! </h2>
      <Button content={"Upload your form"} className={style.btn}></Button>
    </div>
  )
}

export default Phase2
