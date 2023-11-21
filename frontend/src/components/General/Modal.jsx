import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
        
function Modal({buttonText,  content, header}) {
    const [visible, setVisible] = useState(false);

  return (
    <div className="card flex justify-content-center">
            <Button label={buttonText} onClick={() => setVisible(true)} />
            <Dialog header={header} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                {content}
            </Dialog>
    </div>

  )
}

export default Modal
