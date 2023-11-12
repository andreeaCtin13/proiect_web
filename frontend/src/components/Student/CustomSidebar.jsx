import React, { useState } from 'react'
import { Sidebar } from "primereact/sidebar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
function CustomSidebar() {
  const [visible, setVisible] = useState(false);

  return (
    <>
       <button onClick={() => setVisible(true)} >
       <FontAwesomeIcon icon={faBars} />
      </button>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="left"
      >hjbrb</Sidebar>

    </>
  )
}

export default CustomSidebar
