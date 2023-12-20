import React from "react";
import { Dialog } from 'primereact/dialog';
        
function Modal({ header, content, visible, onHide }) {
  return (
    <div className="card flex justify-content-center">
      <Dialog
        header={header}
        visible={visible}
        style={{ width: '50vw' }}
        onHide={onHide}
      >
        {content}
      </Dialog>
    </div>
  );
}

export default Modal
