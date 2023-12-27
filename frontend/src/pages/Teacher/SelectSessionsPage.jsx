import React, { useContext, useState } from "react";
import Form from "../../components/General/Form";
import style from "../../styles/teacher/SelectSessionPage.module.css";
import Button from "../../components/General/Button";
import { UserContext } from "../../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
function SelectSessionsPage() {
  const [teacherInfo, setTeacherInfo] = useState({});
  const { globalUser, setGlobalUser } = useContext(UserContext);
  let ok = 0;

  console.log(globalUser);

  const checkAndSendDates = async () => {
    console.log(teacherInfo);
    if (
      !teacherInfo.hasOwnProperty("data_inceput_1") ||
      !teacherInfo.hasOwnProperty("data_inceput_2") ||
      !teacherInfo.hasOwnProperty("data_inceput_3") ||
      !teacherInfo.hasOwnProperty("data_final_1") ||
      !teacherInfo.hasOwnProperty("data_final_2") ||
      !teacherInfo.hasOwnProperty("data_final_3")
    ) {
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

    let ID = globalUser.idUser;
    let sessions = [];
    sessions.push({
      data_inceput: teacherInfo.data_inceput_1,
      data_final: teacherInfo.data_final_1,
      id_prof_asociat: ID,
    });
    sessions.push({
      data_inceput: teacherInfo.data_inceput_2,
      data_final: teacherInfo.data_final_2,
      id_prof_asociat: ID,
    });
    sessions.push({
      data_inceput: teacherInfo.data_inceput_3,
      data_final: teacherInfo.data_final_3,
      id_prof_asociat: ID,
    });
    console.log("VEZI AICI BRE", sessions);
    try {
      const response = await axios.post(
        "http://localhost:9000/sessions/insertBulkSession",
        sessions
      );
      console.log("RESULT BULK SESSIONS:", response.data);

      toast.success("🦄 You recorded your sessions", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      if (error.response.data.message === "The sessions are overlapping") {
        toast.error("Sessions are overlapping", {
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
      if (error.response.data.message === "Eroare validitate date") {
        toast.error("Final date before Starting Date", {
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
      console.error("Error during bulk session insertion:", error.message);
    }
  };

  const onChange = (e, name) => {
    console.log(e.target.value);
    setTeacherInfo({ ...teacherInfo, [name]: e.target.value });
  };
  const fields = [
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
  ];

  return (
    <div className={style.mainContainer}>
      <h1 className={style.h1}>Add your personal info</h1>
      <div className={style.formContainer}>
        <Form inputs={fields}></Form>
      </div>
      <Button
        content="Complete your aplication"
        className={style.btnCompete}
        onClick={checkAndSendDates}
      ></Button>
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

export default SelectSessionsPage;
