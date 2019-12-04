import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import FormReg from './FormRegister';
import FormLogin from './FormLogin';
import LogoCotizate from '../img/cotizate.png';
import close from '../img/cancel.svg';


class NavBarComponent extends Component
{
    state = {
        visible: false,
        regvisible: false,
        logvisible: false
    }
    openModalReg() {
        this.setState({
            regvisible : true
        });
    }
    openModalLogin(){
        this.setState({
            logvisible: true
        })
    }

    closeModalReg() {
        this.setState({
            regvisible : false
        });
    }
    
    closeModalLogin() {
        this.setState({
            logvisible : false
        });
    }

    render(){
        return(
            <div className="container-fluid">
                    
                <div className="navbar-collapse collapse justify-content-between align-items-center w-100" id="collapsingNavbar2">
                    <ul className="topBotomBordersOut navbar-nav mx-auto text-center">

                        <li className="nav-item"><NavLink to="/explore-project">EXPLORAR PROYECTOS</NavLink></li>
                        <li className="nav-item"><NavLink to="/create-project">CREAR PROYECTOS</NavLink> </li>
                        <li className="nav-logo-cotizate"><NavLink to="/"><img src={LogoCotizate} alt="cotizate"/></NavLink> </li>
                        <li className="nav-item"><NavLink to="#" onClick={() => this.openModalReg()}>REGISTRARSE</NavLink> </li>
                        <li className="nav-item"><NavLink to="/#" onClick={()=> this.openModalLogin()}>ENTRAR</NavLink> </li>
                        <li className="nav-item"><NavLink to="/#">MENU</NavLink> </li>

                    </ul>
                </div>

                <Modal 
                    visible={this.state.regvisible}
                    width="600"
                    height="620"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModalReg()}>
                    <FormReg />
                    <div className="btn-close-wrapper-reg">

                        <div className="btn-close-wrapp-reg">
                            <NavLink to="#" onClick={() => this.closeModalReg()}>
                            <img src={close} alt="cotizate" className="btnclose-reg" />   </NavLink>    
                        </div>
                        
                    </div>
                </Modal>
                
                <Modal 
                    visible={this.state.logvisible}
                    width="400"
                    height="550"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModalLogin()}>
                    <FormLogin />
                    <div className="btn-close-wrapper-login">

                        <div className="btn-close-wrapp-login">
                            <NavLink to="#" onClick={() => this.closeModalLogin()}>
                            <img src={close} alt="cotizate" className="btnclose-login" />   </NavLink>    
                        </div>

                    </div>

                </Modal>

            </div>

        )
    }
}

export default NavBarComponent;
