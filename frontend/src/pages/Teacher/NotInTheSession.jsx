import React from 'react'
import style from "../../styles/teacher/NotInASession.module.css"
import Button from '../../components/General/Button'
import Modal from "../../components/General/Modal";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NotInTheSession() {
  const showModalFunction = ()=>{
    setShowModal(true);
  }

  const [showModal, setShowModal] = useState(false);
  const onHide = () => {
    setShowModal(false);
  };

  return (
    <div className={style.mainContainer}>
      Sorry, you are not in a valid session
      <Button content={"Logout"} onClick={showModalFunction}></Button>
      <Modal
            visible={showModal}
            onHide={onHide}
            header={"Logout"}
            content={<div className={style.modalContent}>
              <div>Are you sure you want to logout?</div>
              <div className={style.btnZone}>
              <Link to ="/" className={style.link}>
                <Button content={"Yes"} className={style.btnLogoutYes} onClick={onHide}></Button>
              </Link>
              <Button content={"No"} className={style.btnLogoutNo} onClick={onHide}></Button>
              </div>
            </div>}/>  
    </div>
  )
}

export default NotInTheSession
