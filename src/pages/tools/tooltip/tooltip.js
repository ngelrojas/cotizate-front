import React from 'react'
import './css/tooltip.css'
import { MdInfoOutline } from 'react-icons/md'


export const Tooltip = ({label, text}) => {
    return(
        <label className="tooltip">{label} <MdInfoOutline />
            <span className="tooltiptext">{text}</span>
        </label>
    )
}
