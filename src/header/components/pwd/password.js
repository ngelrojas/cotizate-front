import React from 'react'
import '../css/pwd.css'
import { MdRemoveRedEye } from "react-icons/md"


export const Password = ({type, value, name, onChange, tshow}) => {
    return(
        <div className="btn-container-hiden-show">
            <input 
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                className="form-control form-control-reg show-input"
            />
            <span onClick={tshow} className="btn-hide-show"><MdRemoveRedEye /></span>
            
        </div>
    )
}
