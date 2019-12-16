import React from 'react'
import { NavLink } from 'react-router-dom'

const isLogin = () =>{
    return window.sessionStorage.getItem('token')
}

const menu_register = ({ModelReg, ModelLogin}) =>{
    return(
        <span>
            <li className="nav-item"><NavLink to="#" onClick={ModelReg}>REGISTRARSE</NavLink> </li> 
            <li className="nav-item"><NavLink to="/#" onClick={ModelLogin}>ENTRAR</NavLink> </li>
        </span>
    )
}

const menu_user = ({ModelReg}) =>{
    return(
        <span>
            <li className="nav-item"><NavLink to="#" onClick={ModelReg}>Hola Ngel</NavLink> </li>
            <li className="nav-item"><NavLink to="/#">MENU</NavLink> </li>
        </span>
    )
}

export const RegisterMenu = ({ModelReg, ModelLogin}) =>{
    return isLogin() ? menu_user:menu_register
}
