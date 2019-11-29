import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './css/footer_home.css';
import facebook from './img/facebook.svg';
import twitter from './img/twitter.svg';
import linkedin from './img/linkedin.svg';
import instagram from './img/instagram.svg';
import mastercard from './img/mastercard.svg';
import visa from './img/visa.svg';


class FooterComponent extends Component
{
    render(){
        return(
            <div className="_container-fluid_">
                <div className="cotizate-footer">

                    <div className="row">
                        <div className="col-4">
                            <div className="row">
                                <div className="col-2"><NavLink to="/"><img src={facebook} alt="cotizate facebook" className="img-responsive-social" /></NavLink></div>
                                <div className="col-2"><NavLink to="/"><img src={twitter} alt="cotizate twitter" className="img-responsive-social" /></NavLink></div>
                                <div className="col-2"><NavLink to="/"><img src={linkedin} alt="cotizate linkedin" className="img-responsive-social" /></NavLink></div>
                                <div className="col-2"><NavLink to="/"><img src={instagram} alt="cotizate instagram" className="img-responsive-social" /></NavLink></div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="title-footer">SOBRE COTIZATE</h6>
                                    <ul className="list-group">
                                        <li className="list-group-item"><NavLink to="/" >Quienes somos</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/">Equipo</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/">Blog</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/">Patrocinadores</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/">Preguntas Frecuentes</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/">Contacto</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="row">
                                <div className="col-3"><NavLink to="/"><img src={mastercard} alt="cotizate mastercard" className="img-responsive-social" /></NavLink></div>
                                <div className="col-3"><NavLink to="/"><img src={visa} alt="cotizate visa" className="img-responsive-social"/></NavLink></div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="title-footer">ATENCION AL CLIENTE</h6>
                                    <ul className="list-group">
                                        <li className="list-group-item"><NavLink to="/" >Guia de usuario</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/">Cookies</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/">Formas de Pago</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/termsandcontiditions">Terminos y condiciones de uso</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="row">
                                <form action="" className="form form-inline">
                                    <input type="text" name="suscriber" className="form-control box-suscribete form-control-suscribe"/>
                                    <button className="btn btn-warning btn-cotizate-suscribete">Suscribete</button>
                                </form>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="title-footer">NUESTRA COMUNIDAD</h6>
                                    <ul className="list-group">
                                        <li className="list-group-item"><NavLink to="/" >Facebook</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/">Linkedin</NavLink></li>
                                        <li className="list-group-item"><NavLink to="/">Twitter</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>      

                    </div>

                </div>
                
                <div className="container-fluid footer-cotizate-down">
                    <div className="col-12">
                    <p className="footer-text">Cotizate todos los derechos reservados 2019</p>
                    </div>
                </div>
            </div>

        )
    }
}

export default FooterComponent;