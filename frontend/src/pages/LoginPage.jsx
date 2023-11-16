import React, { useState } from 'react'
import BackgroundImage from "../images/login-register-image.jpg"
import style from "../styles/LoginPage.module.css"
import Form from '../components/General/Form'
import Button from '../components/General/Button'
import { Link } from 'react-router-dom'
function LoginPage() {

    const [userInfo, setUserInfo] = useState({})
    const onChange =(e, name)=>{
        setUserInfo({...userInfo, [name.toLowerCase()]:e.target.value})
    }

    const fields=[
        {
            inputType: "text",
            labelName: "Mail",
            onChangeAction: onChange,
        },
        {
            inputType: "password",
            labelName: "Password",
            onChangeAction: onChange,
        }
    ]

  return (
    <div className={style.mainContainer}>
      <img src={BackgroundImage} alt="imagine-background" className={style.backgroundImage} />

      <div className={style.form}>
        <h2>Login to your account</h2>
        <Form inputs = {fields}></Form>
        <div className={style.btnZone}>
            <Link to="/register" className={style.link}>
                <Button content={"Create Account"} className={style.btnRegister} ></Button>
            </Link>
            <Button content={"Login"} className={style.btnLogin}></Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
