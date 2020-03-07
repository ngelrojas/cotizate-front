import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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
      showSubMenuCategory: false,
      categories: [],
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

  OpenMenuCategory = () => {
    this.setState({showSubMenuCategory: true}, () => {
      document.addEventListener('click', this.CloseMenuCategory)
    })
  }

  CloseMenuCategory = () => {
    this.setState({showSubMenuCategory: false}, () => {
      document.removeEventListener('click', this.CloseMenuCategory)
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

  getCategories = () => {
    API.get(`/category-list`)
      .then(response => {
        console.log(response.data)
        this.setState({categories: response.data})
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.handlerCP()
    this.getCategories()
  }

  render() {
    const {categories} = this.state
    return (
      <div className="container-fluid">
        <div
          className="navbar-collapse collapse justify-content-between align-items-center w-100"
          id="collapsingNavbar2">
          {this.state.isToken ? (
            <ul className="user-menu topBotomBordersOut navbar-nav mx-auto text-center">
              <li className="nav-item">
                <Link to="/explore-project">EXPLORAR PROYECTOS</Link>
              </li>
              <li className="nav-item">
                <Link to="/create-project">CREAR PROYECTOS</Link>
              </li>
              <li className="nav-logo-cotizate">
                <Link to="/">
                  <img src={LogoCotizate} alt="cotizate" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" onClick={() => this.OpenMenuCategory()}>
                  CATEGORIAS <MdExpandMore />
                </Link>
                <ul className="submenu-categories">
                  {this.state.showSubMenuCategory
                    ? categories &&
                      categories.map(category => (
                        <li key={category.id}>
                          <Link to={`/${category.name}`}>{category.name}</Link>
                        </li>
                      ))
                    : null}
                </ul>
              </li>

              <li className="nav-item user-menu__name">
                <Link to="#" onClick={() => this.openSubmenu()}>
                  hola, {this.state.data_user.name} <MdExpandMore />
                </Link>
                {this.state.showSubMenu ? (
                  <ul className="submenu-user">
                    <li>
                      <Link to="/profile/me">
                        Mi perfil <MdPersonOutline />
                      </Link>
                    </li>
                    <li>
                      <Link to="/project/create-project">
                        Crear Proyectos <MdCreate />
                      </Link>
                    </li>
                    <li>
                      <Link to="/project/update-projects">
                        Mis Proyectos <MdViewHeadline />
                      </Link>
                    </li>
                    <li>
                      <Link to="/#" onClick={() => this.Logout()}>
                        Salir <MdInput />
                      </Link>
                    </li>
                  </ul>
                ) : null}
              </li>
            </ul>
          ) : (
            <ul className="topBotomBordersOut navbar-nav mx-auto text-center">
              <li className="nav-item">
                <Link to="/explore-project">EXPLORAR PROYECTOS</Link>
              </li>
              <li className="nav-item">
                <Link to="/#" onClick={() => this.openModalLogin()}>
                  CREAR PROYECTOS
                </Link>{' '}
              </li>
              <li className="nav-logo-cotizate">
                <Link to="/">
                  <img src={LogoCotizate} alt="cotizate" />
                </Link>{' '}
              </li>
              <li className="nav-item">
                <Link to="/#">CATEGORIAS</Link>
              </li>
              <li className="nav-item">
                <Link to="#" onClick={() => this.openModalReg()}>
                  REGISTRARSE
                </Link>{' '}
              </li>
              <li className="nav-item">
                <Link to="/#" onClick={() => this.openModalLogin()}>
                  ENTRAR
                </Link>{' '}
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
              <Link to="#" onClick={() => this.closeModalReg()}>
                <img src={close} alt="cotizate" className="btnclose-reg" />{' '}
              </Link>
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
              <Link to="#" onClick={() => this.closeModalLogin()}>
                <img src={close} alt="cotizate" className="btnclose-login" />{' '}
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default NavBarComponent
