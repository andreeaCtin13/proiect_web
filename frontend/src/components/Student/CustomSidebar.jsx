import React, { useState } from 'react'
import { Sidebar } from "primereact/sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import style from "../../styles/CustomSidebar.module.css"

import {Link} from "react-router-dom"
function CustomSidebar() {
  const [visible, setVisible] = useState(false);

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
          reufher
        {/* <Link ></Link> */}
        </div>
      </Sidebar>

    </>
  )
}

export default CustomSidebar
