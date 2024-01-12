import React from 'react'
import style from "../../styles/teacher/NotInASession.module.css"
import Button from '../../components/General/Button'

function NotInTheSession() {
  return (
    <div className={style.mainContainer}>
      Sorry, you are not in a valid session
      <Button content={"Logout"}></Button>
    </div>
  )
}

export default NotInTheSession
