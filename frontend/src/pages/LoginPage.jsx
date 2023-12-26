import React, { useContext, useState } from "react";
import BackgroundImage from "../images/login-register-image.jpg";
import style from "../styles/LoginPage.module.css";
import Form from "../components/General/Form";
import Button from "../components/General/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const { globalUser, setGlobalUser } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({});
  const onChange = (e, name) => {
    setUserInfo({ ...userInfo, [name]: e.target.value });
  };
  const fields = [
    {
      inputType: "text",
      labelName: "Mail",
      name: "mail",
      change: false,
      onChangeAction: onChange,
    },
    {
      inputType: "password",
      labelName: "Password",
      name: "password",
      change: false,
      onChangeAction: onChange,
    },
  ];

  const login = async (e) => {
    e.preventDefault();
    const data = await axios
      .post("http://localhost:9000/users/login", userInfo)
      .then((response) => {
        setGlobalUser({...response.data})
        console.log(globalUser)

        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    if (data === undefined) {
      toast.error("Sorry bro, your login data is not ok :(", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else{
      toast.success('🦄 You are logged in princess', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };
  return (
    <div className={style.mainContainer}>
      <img
        src={BackgroundImage}
        alt="imagine-background"
        className={style.backgroundImage}
      />
      <div className={style.form}>
        <h2>Login to your account</h2>
        <Form inputs={fields}></Form>
        <div className={style.btnZone}>
          <Link to="/register" className={style.link}>
            <Button
              content={"Create Account"}
              className={style.btnRegister}
            ></Button>
          </Link>
          {/* <Link className={style.link} to={userStatus==="teacher"?"/teacher/students-requests":"/user/teachers"}> */}
          <Button
            content={"Login"}
            className={style.btnLogin}
            onClick={login}
          ></Button>
          {/* </Link> */}
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
  );
}

export default LoginPage;
