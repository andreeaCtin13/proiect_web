import React, { useContext, useEffect, useState } from 'react'
import BackgroundImage from "../images/login-register-image.jpg"
import style from "../styles/Register.module.css"
import Form from '../components/General/Form'
import Button from '../components/General/Button'
import { Link } from 'react-router-dom'
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../context/UserContext'

function Register() {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate();


  const onChange =(e, name)=>{
    setUserInfo({...userInfo, [name]:e.target.value})
  }
  const onChecked=(e, name)=>{
    if(e.target.id==="Teacher"){
      setUserInfo({...userInfo, [name]:"teacher"})
    }
    else{
      setUserInfo({...userInfo, [name]:"student"})
    }
  }
  const fields=[
    {
      inputType: "text",
      labelName: "Nume",
      name:"nume",
      change:false,
      onChangeAction: onChange,
  },
    {
        inputType: "text",
        labelName: "Mail",
        name:"mail",
        onChangeAction: onChange,
    },
    {
        inputType: "password",
        labelName: "Password",
        name:"password",
        onChangeAction: onChange,
    },
    {
      inputType: "password",
      labelName:"Confirm Password",
      name:"confirmPassword",
      onChangeAction: onChange
    },
    {
      inputType:"radio",
      labelName:"Teacher",
      name:"userType",
      change:true,
      onChangeAction:onChecked
    },
    {
      inputType:"radio",
      labelName:"Student",
      name:"userType",
      change:true,
      onChangeAction:onChecked
    }
]

const register=async(e)=>{  
    e.preventDefault();
    if(userInfo.userType === "student"){
      userInfo.isProfesor = false
      const data = await axios
      .post( "http://localhost:9000/users/register",userInfo)
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
        console.log(data) 
    }
    else{
      userInfo.isProfesor = true
      const user={...userInfo}
      setGlobalUser(user)
      navigate("/teacher/select-sessions")
    }
  }

  return (
    <div className={style.mainContainer}>
    <img src={BackgroundImage} alt="imagine-background" className={style.backgroundImage} />

    <div className={style.form}>
      <h2>Create your account</h2>
      <Form inputs = {fields}></Form>
      <div className={style.btnZone}>
      <Link to="/login" className={style.link}>
        <Button content={"Login"} className={style.btnLogin}></Button>
      </Link>
        <Button content={"Create Account"} className={style.btnRegister} onClick={register}></Button>
      </div>
    </div>
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

export default Register
