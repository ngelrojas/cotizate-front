import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import Modal from 'react-awesome-modal'
import FormReg from './FormRegister'
import FormLogin from './FormLogin'
import LogoCotizate from '../img/cotizate.png'
import close from '../img/cancel.svg'
import {
  MdInput,
  MdExpandMore,
  MdPersonOutline,
  MdViewHeadline,
  MdCreate,
} from 'react-icons/md'
import API from '../../conf/api.js'
import './css/menus.css'

class NavBarComponent extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      regvisible: false,
      logvisible: false,
      isToken: '',
      showSubMenu: false,
      isCreateProject: false,
      data_user: {},
    }
  }

  openModalReg() {
    this.setState({
      regvisible: true,
    })
  }

  openModalLogin() {
    this.setState({
      logvisible: true,
    })
  }

  closeModalReg() {
    this.setState({
      regvisible: false,
    })
  }

  closeModalLogin() {
    this.setState({
      logvisible: false,
    })
  }

  openSubmenu = () => {
    this.setState({showSubMenu: true}, () => {
      document.addEventListener('click', this.closeSubmenu)
    })
  }

  closeSubmenu = () => {
    this.setState({showSubMenu: false}, () => {
      document.removeEventListener('click', this.closeSubmenu)
    })
  }

  Logout = () => {
    window.sessionStorage.removeItem('token')
    this.setState({isToken: ''})
  }

  handlerCP = () => {
    let istoken = window.sessionStorage.getItem('token')

    API.get(`/user/me`, {
      headers: {Authorization: 'token ' + istoken},
    })
      .then(ans => {
        this.setState({
          data_user: ans.data,
          isToken: istoken,
        })
      })
      .catch(e => {
        this.Logout()
      })
  }

  componentDidMount() {
    this.handlerCP()
  }

  render() {
    return (
      <div className="container-fluid">
        <div
          className="navbar-collapse collapse justify-content-between align-items-center w-100"
          id="collapsingNavbar2">
          {this.state.isToken ? (
            <ul className="user-menu topBotomBordersOut navbar-nav mx-auto text-center">
              <li className="nav-item">
                <NavLink to="/explore-project">EXPLORAR PROYECTOS</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/create-project">CREAR PROYECTOS</NavLink>{' '}
              </li>
              <li className="nav-logo-cotizate">
                <NavLink to="/">
                  <img src={LogoCotizate} alt="cotizate" />
                </NavLink>{' '}
              </li>
              <li className="nav-item">
                <NavLink to="#" onClick={() => this.openModalReg()}>
                  MENU
                </NavLink>{' '}
              </li>
              <li className="nav-item">
                <NavLink to="/#" onClick={() => this.openModalLogin()}>
                  MENU
                </NavLink>{' '}
              </li>
              <li className="nav-item user-menu__name">
                <NavLink to="#" onClick={() => this.openSubmenu()}>
                  hola, {this.state.data_user.name} <MdExpandMore />
                </NavLink>
                {this.state.showSubMenu ? (
                  <ul className="submenu-user">
                    <li>
                      <NavLink to="/profile/me">
                        Mi perfil <MdPersonOutline />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/project/create-project">
                        Crear Proyectos <MdCreate />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/project/update-projects">
                        Mis Proyectos <MdViewHeadline />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/#" onClick={() => this.Logout()}>
                        Salir <MdInput />
                      </NavLink>
                    </li>
                  </ul>
                ) : null}
              </li>
            </ul>
          ) : (
            <ul className="topBotomBordersOut navbar-nav mx-auto text-center">
              <li className="nav-item">
                <NavLink to="/explore-project">EXPLORAR PROYECTOS</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/#" onClick={() => this.openModalLogin()}>
                  CREAR PROYECTOS
                </NavLink>{' '}
              </li>
              <li className="nav-logo-cotizate">
                <NavLink to="/">
                  <img src={LogoCotizate} alt="cotizate" />
                </NavLink>{' '}
              </li>
              <li className="nav-item">
                <NavLink to="#" onClick={() => this.openModalReg()}>
                  REGISTRARSE
                </NavLink>{' '}
              </li>
              <li className="nav-item">
                <NavLink to="/#" onClick={() => this.openModalLogin()}>
                  ENTRAR
                </NavLink>{' '}
              </li>
              <li className="nav-item">
                <NavLink to="/#">MENU</NavLink>{' '}
              </li>
            </ul>
          )}
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
                <img src={close} alt="cotizate" className="btnclose-reg" />{' '}
              </NavLink>
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
                <img src={close} alt="cotizate" className="btnclose-login" />{' '}
              </NavLink>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default NavBarComponent
