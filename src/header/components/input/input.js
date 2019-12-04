import React from 'react'
import '../css/validation.css'


export const Input = ({ type, name, value, onChange }) => {
    return(
        <input type={type} 
               name={name} 
               value={value} 
               onChange={onChange} 
               className="form-control form-control-reg" 
        />
    )
}
