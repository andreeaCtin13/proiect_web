import React, { useState } from 'react'
import Form from "../../components/General/Form"
function SelectSessionsPage() {
  const [teacherInfo, setTeacherInfo] = useState({})

  const onChange =(e, name)=>{
    setTeacherInfo({...teacherInfo, [name]:e.target.value})
}
// const mail = req.body.mail;
// const password = req.body.password;
// const nume = req.body.nume;
// const isProfesor = req.body.isProfesor;
// const idProfAsociat = req.body.idProfAsociat;
// const nrMaximStudenti = req.body.nrMaximStudenti;
  const fields=[
    {
        inputType: "text",
        labelName: "Mail",
        name:"mail",
        change:false,
        onChangeAction: onChange,
    },
    {
        inputType: "password",
        labelName: "Password",
        name: "password",
        change:false,
        onChangeAction: onChange,
    },
]

  return (
    <div>
      <Form></Form>
    </div>
  )
}

export default SelectSessionsPage
