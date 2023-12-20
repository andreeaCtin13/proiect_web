import React, { useState } from 'react'
import Form from "../../components/General/Form"
import style from "../../styles/teacher/SelectSessionPage.module.css"
import Button from "../../components/General/Button"
function SelectSessionsPage() {
  const [teacherInfo, setTeacherInfo] = useState({})


  const checkAndSendDates=()=>{
    //aici o s atrimitem catre back si o sa facem cateva validari

  }
    
  const onChange= (e,name)=>{
    console.log(e.target.value)
      setTeacherInfo({...teacherInfo, [name]:e.target.value})
  }
  const fields=[
    {
        inputType: "number",
        labelName: "Nr. studenti",
        name:"nrMaximStudenti",
        onChangeAction: onChange,
    },
    {
        inputType: "date",
        labelName: "Session 1 - Starting date",
        name: "data_inceput_1",
        onChangeAction: onChange,
    },
    {
      inputType: "date",
      labelName: "Session 1 - Final date",
      name: "data_final_1",
      onChangeAction: onChange,
  },
  {
    inputType: "date",
    labelName: "Session 2 - Starting date",
    name: "data_inceput_2",
      onChangeAction: onChange,
  },
  {
    inputType: "date",
    labelName: "Session 2 - Final date",
    name: "data_final_2",
    onChangeAction: onChange,
  },
  {
    inputType: "date",
    labelName: "Session 3 - Starting date",
    name: "data_inceput_3",
    onChangeAction: onChange,
  },
  {
  inputType: "date",
  labelName: "Session 3 - Final date",
  name: "data_final_3",
  onChangeAction: onChange,
  },
  
]

  return (
    <div className={style.mainContainer}>
      <h1 className={style.h1}>Add your personal info</h1>
      <div className={style.formContainer}>
      <Form inputs={fields}></Form>
      </div>
      <Button content = "Complete your aplication" className={style.btnCompete} onClick={checkAndSendDates}></Button>
    </div>
  )
}

export default SelectSessionsPage
