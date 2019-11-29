import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import facebook from '../../footer/img/facebook.svg';
import linkedin from '../../footer/img/linkedin.svg';
import twitter from '../../footer/img/twitter.svg';
import instagram from '../../footer/img/instagram.svg';
import FormForgotPwd from './FormForgotPassword';
import FormReg from './FormRegister';
import close from '../img/cancel.svg';


class FormLogin extends Component
{
    state = {
        visible: false,
        regvisible: false,
        forgotpwdvisible: false
    }
    openModalForgotPassword() {
        this.setState({
            forgotpwdvisible : true
        });
    }
    closeModalForgotPassword() {
        this.setState({
            forgotpwdvisible : false
        });
    }
    openModalReg() {
        this.setState({
            regvisible : true
        });
    }
    closeModalReg() {
        this.setState({
            regvisible : false
        });
    }

    render(){
        return(
                <div className="cotizate-modal-reg">
                    <div className="form-cotizate-reg">
                        <h4 className="title-form-reg"><span className="title-welcome">INGRESAR</span></h4>
                        
                        <form className="">
                            <div className="form-group">
                                <label className="text-label">Email</label>
                                <input type="email" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group">
                                <label className="text-label">Contraseña</label>
                                <input type="password" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group">
                                <label className="text-remember-me">
                                    <input type="checkbox" />
                                    <span className="label-remember-me">recordar mis datos</span>
                                </label>
                            </div>
                            <div className="form-group links">
                                <div className="row">
                                    <div className="col-md-6 text-forget">
                                        <NavLink to="#" onClick={() => this.openModalForgotPassword()}>
                                            Olvide mi contraseña
                                        </NavLink>
                                    </div>
                                    <div className="col-md-6 text-register">
                                        <NavLink to="#" onClick={() => this.openModalReg()}>
                                            Registrarse
                                        </NavLink>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group btn-reg-content">
                                <button className="btn btn-primary btn-reg">ENTRAR</button>
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
                    <Modal 
                        visible={this.state.forgotpwdvisible}
                        width="700"
                        height="400"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModalForgotPassword()}>
                        <FormForgotPwd />
                        <div className="btn-close-wrapper-fpw">
                        
                            <div className="btn-close-wrapp-fpw">
                                <NavLink to="#" onClick={() => this.closeModalForgotPassword()}>
                                <img src={close} alt="cotizate" className="btnclose-fwp" />   </NavLink>    
                            </div>
                            
                        </div>
                    </Modal>

                    <Modal 
                        visible={this.state.regvisible}
                        width="800"
                        height="620"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModalReg()}>
                        <FormReg />
                        <div className="btn-close-wrapper">

                            <div className="btn-close-wrapp">
                                <NavLink to="#" onClick={() => this.closeModalReg()}>
                                <img src={close} alt="cotizate" className="btnclose" />   </NavLink>    
                            </div>
                            
                        </div>
                        
                    </Modal>
                    

                </div>          
        )
    }
}

export default FormLogin;