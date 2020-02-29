import React, {Component} from 'react'
import API from '../../conf/api.js'
import {Link} from 'react-router-dom'
import Modal from 'react-awesome-modal'
import facebook from '../../footer/img/facebook.svg'
import linkedin from '../../footer/img/linkedin.svg'
import twitter from '../../footer/img/twitter.svg'
import instagram from '../../footer/img/instagram.svg'
import FormForgotPwd from './FormForgotPassword'
import FormReg from './FormRegister'
import close from '../img/cancel.svg'
import {Input} from '../components/input/input.js'
import {Password} from '../components/pwd/password.js'
import './css/validation.css'

class FormLogin extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      regvisible: false,
      forgotpwdvisible: false,
      fields: {},
      errors: {},
      hidden: true,
      redirectTorefer: false,
    }
  }

  handleChange = e => {
    e.preventDefault()
    let fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({
      fields,
    })
  }

  toogleShow = () => {
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  validateForm() {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true

    if (!fields['email']) {
      formIsValid = false
      errors['email'] = 'porfavor ingrese un email.'
    }

    if (typeof fields['email'] !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      )
      if (!pattern.test(fields['email'])) {
        formIsValid = false
        errors['email'] = 'porfavor ingrese un email valido.'
      }
    }

    this.setState({
      errors: errors,
    })

    return formIsValid
  }

  submitLogin = async e => {
    e.preventDefault()
    if (this.validateForm()) {
      let errors = {}

      await API.post(`/user/token/`, {
        email: this.state.fields.email,
        password: this.state.fields.password,
      })
        .then(resp => {
          window.sessionStorage.setItem('token', resp.data.token)
          window.location = '/'
        })
        .catch(err => {
          if (err.request.response) {
            errors['msg'] = 'las credenciales no son correctas.'
          }
        })

      this.setState({
        errors: errors,
      })
    }
  }

  openModalForgotPassword() {
    this.setState({
      forgotpwdvisible: true,
    })
  }
  closeModalForgotPassword() {
    this.setState({
      forgotpwdvisible: false,
    })
  }
  openModalReg() {
    this.setState({
      regvisible: true,
    })
  }
  closeModalReg() {
    this.setState({
      regvisible: false,
    })
  }

  render() {
    return (
      <div className="cotizate-modal-reg">
        <div className="form-cotizate-reg">
          <h4 className="title-form-reg">
            <span className="title-welcome">INGRESAR</span>
          </h4>

          <form className="" method="POST" onSubmit={this.submitLogin}>
            <div className="form-group">
              <label className="text-label">Email</label>
              <Input
                type={'email'}
                name={'email'}
                value={this.state.fields.email || ''}
                onChange={this.handleChange}
              />
              <div className="errorLogin">{this.state.errors.email}</div>
            </div>
            <div className="form-group">
              <label className="text-label">Contraseña</label>
              <Password
                type={this.state.hidden ? 'password' : 'text'}
                value={this.state.fields.password || ''}
                name="password"
                onChange={this.handleChange}
                tshow={this.toogleShow}
              />
            </div>
            <div className="errorLogin">
              <span>{this.state.errors.msg}</span>
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
                  <Link to="#" onClick={() => this.openModalForgotPassword()}>
                    Olvide mi contraseña
                  </Link>
                </div>
                <div className="col-md-6 text-register">
                  <Link to="#" onClick={() => this.openModalReg()}>
                    Registrarse
                  </Link>
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
                  <li>
                    <Link to="">
                      <img
                        src={linkedin}
                        className="img-responsive"
                        alt="cotizate linkedin"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <img
                        src={twitter}
                        className="img-responsive"
                        alt="cotizate twitter"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <img
                        src={facebook}
                        className="img-responsive"
                        alt="cotizate facebook"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <img
                        src={instagram}
                        className="img-responsive"
                        alt="cotizate instagram"
                      />
                    </Link>
                  </li>
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
              <Link to="#" onClick={() => this.closeModalForgotPassword()}>
                <img src={close} alt="cotizate" className="btnclose-fwp" />
              </Link>
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
              <Link to="#" onClick={() => this.closeModalReg()}>
                <img src={close} alt="cotizate" className="btnclose" />
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default FormLogin
