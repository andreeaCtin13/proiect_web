import React, { useEffect, useState } from 'react'
import style from "../../styles/teacher/SessionsView.module.css"
import { Link } from 'react-router-dom'
import axios from "axios";
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

function SessionsView() {
  const [sessions, setSessions] = useState([])
  const { globalUser, setGlobalUser } = useContext(UserContext);

  const loadData = async()=>{
    let resp = await axios.get(`http://localhost:9000/sessions/getAllSessions/${globalUser.idUser}`)
    setSessions(resp.data)
  }
  useEffect(()=>{
   loadData()
  },[])


  return (
    <div className={style.mainContainer}>
      <Link className={style.backButton} to={"/teacher/students-requests"}>
        <div >&lt;</div>
      </Link>
      <h1 className={style.title}>Hi, {globalUser.nume}!! Here are your sessions:</h1>
      <div className={style.containerSessions}>
        {
          sessions.map((x, index)=>{
            console.log(x,index)
            let data2 = x.data_final.substr(0, 10)
            let data1 = x.data_inceput.substr(0, 10)

            return <div>Session {index+1} {data1}-{data2}</div>
          })
        }
      </div>
    </div>
  )
}

export default SessionsView
