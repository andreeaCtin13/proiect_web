import React from 'react'
import LoadingAnimation from '../../components/General/LoadingAnimation'
import style from "../../styles/student/CurrentStatusPage.module.css"

function CurrentStatusPage() {
  return (
    <div className={style.mainContainer}>
      <h1>Your current status</h1>
      <div className={style.loadingSection}>
      <LoadingAnimation></LoadingAnimation>
      <h2 className={style.h2}>Don't give up, a teacher is going to accept your request soon</h2>
      </div>

    </div>
  )
}

export default CurrentStatusPage
