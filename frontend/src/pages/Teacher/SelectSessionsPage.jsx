import React, { useContext, useState } from 'react'
import Form from "../../components/General/Form"
import style from "../../styles/teacher/SelectSessionPage.module.css"
import Button from "../../components/General/Button"
import { UserContext } from '../../context/UserContext'
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
function SelectSessionsPage() {
  const [teacherInfo, setTeacherInfo] = useState({})
  const { globalUser, setGlobalUser } = useContext(UserContext);

  console.log(globalUser)

  const checkAndSendDates=async()=>{   
    console.log(teacherInfo)
    if(!teacherInfo.hasOwnProperty("nrMaximStudenti")||!teacherInfo.hasOwnProperty("data_inceput_1")||!teacherInfo.hasOwnProperty("data_inceput_2")||!teacherInfo.hasOwnProperty("data_inceput_3")||!teacherInfo.hasOwnProperty("data_final_1")||!teacherInfo.hasOwnProperty("data_final_2")||!teacherInfo.hasOwnProperty("data_final_3")){
      
      toast.error("Sorry bro, nu ai adaugat toate datele necesare", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if(Number.isNaN(parseInt(teacherInfo.nrMaximStudenti))){
      toast.error("nu ai introdus un nr maxim de studenti valid", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    else{
      setGlobalUser({...globalUser, nr_maxim_studenti:teacherInfo.nrMaximStudenti})
      console.log("inainte de put: ", globalUser)
      await axios.put(`http://localhost:9000/users/updateUser/${globalUser.idUser}`, {...globalUser, nr_maxim_studenti:teacherInfo.nrMaximStudenti}).then((rezult)=>{
        console.log("Va rog eu: ", rezult)
      }).catch((err)=>{
        console.log(err)
      })
    }

    let sessions =[]
    sessions.push({
      data_inceput:teacherInfo.data_inceput_1,
      data_final:teacherInfo.data_final_1,
      id_prof_asociat:globalUser.idUser
    })
    sessions.push({
      data_inceput:teacherInfo.data_inceput_2,
      data_final:teacherInfo.data_final_2,
      id_prof_asociat:globalUser.idUser
    })
    sessions.push({
      data_inceput:teacherInfo.data_inceput_3,
      data_final:teacherInfo.data_final_3,
      id_prof_asociat:globalUser.idUser
    })

    const data = await axios
    .post( "http://localhost:9000/users/register",globalUser)
    .then((response) => {
      const {user, jwtToken} = response.data

      toast.success('🦄 You created a new account, go to login to access it', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      
        setGlobalUser(user)
      return response.data
    })
    .catch((error) => {
      console.error(error);
    });
    console.log("SESSIONS THAT ARE GOING TO BE INSERTED")
    try {
      const response = await axios.post("http://localhost:9000/sessions/insertBulkSession", sessions);
      console.log("RESULT BULK SESSIONS:", response.data);
    } catch (error) {
      console.error("Error during bulk session insertion:", error.message);
    }
    
    console.log(data)
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

export default SelectSessionsPage
