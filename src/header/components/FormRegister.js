import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import facebook from '../../footer/img/facebook.svg';
import linkedin from '../../footer/img/linkedin.svg';
import twitter from '../../footer/img/twitter.svg';
import instagram from '../../footer/img/instagram.svg';


class FormRegister extends Component
{

    render(){
        return(
                <div className="cotizate-modal-reg">
                    <div className="form-cotizate-reg">
                        <h4 className="title-form-reg"><span className="title-welcome">BIENVENIDO A COTIZATE</span></h4>
                        
                        <form className="form row">
                            <div className="form-group col-6">
                                <label className="text-label">Nombre</label>
                                <input type="text" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group col-6">
                                <label className="text-label">Apellido</label>
                                <input type="text" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group col-6">
                                <label className="text-label">Email</label>
                                <input type="text" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group col-6">
                                <label className="text-label">Contraseña</label>
                                <input type="password" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group col-6">
                                <label className="text-label">Repetir Contraseña</label>
                                <input type="password" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group col-12">
                                <label className="text-agree-content col-3">
                                    <input type="checkbox" />
                                    <span className="text-agree">ESTOY DE ACUERDO</span>
                                </label>
                            </div>
                            <div className="form-group text-terms col-12">
                                
                                <a href="/termsandcontiditions">
                                    TERMINOS DE USO Y POLITICAS DE PRIVACIDAD
                                </a>
                            </div>
                            <div className="form-group btn-reg-content col-12">
                                <button className="btn btn-primary btn-reg">REGISTRARSE</button>
                            </div>
                            <div className="form-group btn-reg-content">
                                <p className="text-iniciar">INICIAR SESION CON</p>
                                <div className="social-networks">
                                    <ul className="list-social-networks">
                                        <li><NavLink to=""><img src={linkedin} className="img-responsive" alt="cotizate linkedin"/></NavLink></li>
                                        <li><NavLink to=""><img src={twitter} className="img-responsive" alt="cotizate twitter"/></NavLink></li>
                                        <li><NavLink to=""><img src={facebook} className="img-responsive" alt="cotizate facebook"/></NavLink></li>
                                        <li><NavLink to=""><img src={instagram} className="img-responsive" alt="cotizate instagram"/></NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                        
                    </div>

                </div>          
        )
    }
}

export default FormRegister;