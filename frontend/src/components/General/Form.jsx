import React from 'react'
import style from "../../styles/Form.module.css"

function Form({inputs}) {
  return (
        <form className={style.form}>
        {inputs.map((x, index)=>{
            return <div key={index} className={style.formRow}>
                    <label  className={style.label} htmlFor={x.labelName}>{x.labelName}</label>
                    <input name={x.name} className={style.input} id={x.labelName} type={x.inputType}  onChange={(e)=>x.onChangeAction(e, x.name)} />                                      
                </div>
        })}
    </form>
  )
}

export default Form
