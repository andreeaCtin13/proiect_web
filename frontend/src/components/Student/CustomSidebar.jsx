import React, { useState } from 'react'
import { Sidebar } from "primereact/sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import style from "../../styles/CustomSidebar.module.css"
import logo from "../../images/logo.png"
import {Link} from "react-router-dom";
import Modal from '../General/Modal';
import Button from '../General/Button';
function CustomSidebar() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onHide = () => {
    setShowModal(false);
  };

  const showModalFunction = ()=>{
    setShowModal(true);

  }
  return (
    <>
      <button onClick={() => setVisible(true)}  className={style.menuBtn}>
        <FontAwesomeIcon icon={faBars}/>      
      </button>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="left"
        className={style.sidebarContainer}
      >
        <div className={style.content}>
          <img src={logo} alt="logo" className={style.logo} />
        <Link to="/user/current-status" className={style.link}>Status</Link>
        <Link to="/user/teachers" className={style.link}>Search for a teacher</Link>
        <Button className={style.btnLogout} onClick={showModalFunction} content='Logout'></Button>
        </div>
      </Sidebar>
      <Modal
            visible={showModal}
            onHide={onHide}
            header={"Logout"}
            content={<div className={style.modalContent}>
              <div>Are you sure you want to logout?</div>
              <div className={style.btnZone}>
              <Link to ="/" className={style.link}>
                <Button content={"Yes"} className={style.btnLogoutYes}></Button>
              </Link>
              <Button content={"No"} className={style.btnLogoutNo} onClick={onHide}></Button>
              </div>
            </div>}/>  
    </>
  )
}

export default CustomSidebar
