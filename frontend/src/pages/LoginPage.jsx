import React, { useContext, useState } from "react";
import BackgroundImage from "../images/login-register-image.jpg";
import style from "../styles/LoginPage.module.css";
import Form from "../components/General/Form";
import Button from "../components/General/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

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
  console.log(globalUser);
  let ID = -1;
  let isProfesor = false;

  const login = async (e) => {
    e.preventDefault();
    const data = await axios
      .post("http://localhost:9000/users/login", userInfo)
      .then((response) => {
        setGlobalUser({ ...response.data.user });
        ID = response.data.user.idUser;
        response.data.user.isProfesor
          ? (isProfesor = true)
          : (isProfesor = false);
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
    } else {
      toast.success("🦄 You are logged in princess", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(globalUser);

      if (isProfesor) {
        const sessions_exist = await axios
          .get(`http://localhost:9000/sessions/getAllSessions/${ID}`)
          .then((rez) => {
            console.log(rez.data);
            if (rez.data.length === 0) {
              console.log("ajung aici");
              navigate("/teacher/select-sessions");
            } else {
              let data_actuala = new Date();
              let ok = false;
              for (let i = 0; i < rez.data.length; i++) {
                let data_inceput = new Date(
                  rez.data[i].data_inceput
                );
                let data_final = new Date(rez.data[i].data_final);
                if (
                  data_inceput <= data_actuala &&
                  data_final >= data_actuala
                ) {
                  ok = true;
                  break;
                }
              }
              if (ok === true) {
                navigate("/teacher/students-requests");
              } else {
                navigate("/teacher/out-of-sessions");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        navigate("/user/teachers");
      }
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
          <Button
            content={"Login"}
            className={style.btnLogin}
            onClick={login}
          ></Button>
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
