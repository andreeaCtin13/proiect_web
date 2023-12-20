import React from 'react'
import style from "../../styles/teacher/SessionsView.module.css"
import { Link } from 'react-router-dom'
function SessionsView() {
  const sessions = [
    {
      dataInceput:"12/02/2003",
      dataFinal:"14/09/2009"
    },
    {
      dataInceput:"13/02/2003",
      dataFinal:"14/05/2009"
    },
    {
      dataInceput:"09/02/2003",
      dataFinal:"18/02/2009"
    }
  ]
  const user = {
    nume:"Toma Cristian"
  }
  return (
    <div className={style.mainContainer}>
      <Link className={style.backButton} to={"/teacher/students-requests"}>
        <div >&lt;</div>
      </Link>
      <h1 className={style.title}>Hi, {user.nume}!! Here are your sessions:</h1>
      <div className={style.containerSessions}>
        {
          sessions.map((x, index)=>{
            return <div>Session {index+1} ( {x.dataInceput} - {x.dataFinal} )</div>
          })
        }
      </div>
    </div>
  )
}

export default SessionsView
