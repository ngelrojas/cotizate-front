import React, { Component} from 'react';
import {NavLink} from 'react-router-dom';
import FooterHome from '../../footer/FooterComponent';
import './css/create_project.css';


class CreateProject extends Component{
    render(){
        return(
            <div className="container-site_on">
                <div className="container">
                    <div className="h5-center">
                        <h5 className="title-create">Crea tu proyecto en minutos en COTIZATE es simple y seguro.</h5>
                    </div>    
                    <div className="h5-center">
                        <h5 className="title-create-sub">Has tu proyecto realidad con CROWFUNDING : Recoge fondos para tus proyectos e ideas.</h5>
                    </div>
                    <div className="h5-center_btn">
                        <NavLink to="project/step-one" className="btn btn-warning btn-want">QUIERO DINERO PARA MI PROYECTO</NavLink>
                    </div>
                </div>

                <FooterHome />

            </div> 
            
        )
    }
}

export default CreateProject;