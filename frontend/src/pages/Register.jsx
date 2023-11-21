import React, { useState } from 'react'
import BackgroundImage from "../images/login-register-image.jpg"
import style from "../styles/Register.module.css"
import Form from '../components/General/Form'
import Button from '../components/General/Button'
import { Link } from 'react-router-dom'
function Register() {
  const [userInfo, setUserInfo] = useState({})
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
  console.log(userInfo)
  const fields=[
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
        <Button content={"Create Account"} className={style.btnRegister} ></Button>
      </div>
    </div>
  </div>
  )
}

export default Register
