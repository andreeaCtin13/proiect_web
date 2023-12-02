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
      <Link className={style.backButton}>
        <div >&lt;</div>
      </Link>
      <h1 className={style.title}>Hi, {user.nume}!! Here are your sessions:</h1>
      <div className={style.containerSessions}>
        <div>Session 1 ( {sessions[0].dataInceput} - {sessions[0].dataFinal} )</div>
        <div>Session 2 ( {sessions[1].dataInceput} - {sessions[1].dataFinal} )</div>
        <div>Session 3 ( {sessions[2].dataInceput} - {sessions[2].dataFinal} )</div>

      </div>
    </div>
  )
}

export default SessionsView
