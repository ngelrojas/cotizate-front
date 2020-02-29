import React, {Component} from 'react'
import API from '../../conf/api.js'
import {Link} from 'react-router-dom'
import facebook from '../../footer/img/facebook.svg'
import linkedin from '../../footer/img/linkedin.svg'
import twitter from '../../footer/img/twitter.svg'
import instagram from '../../footer/img/instagram.svg'
import {Input} from '../components/input/input.js'
import {Password} from '../components/pwd/password.js'

class FormRegister extends Component {
  constructor() {
    super()
    this.state = {
      hidden: true,
      fields: {},
      errors: {},
      success: {},
      serverResponse: '',
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
    this.setState({hidden: !this.state.hidden})
  }

  clear_fields = fields => {
    fields['first_name'] = ''
    fields['last_name'] = ''
    fields['email'] = ''
    fields['password'] = ''
    fields['dni'] = ''
    fields['cellphone'] = ''
  }

  submitRegister = async e => {
    e.preventDefault()
    if (this.validateForm()) {
      let fields = {}
      let success = {}

      await API.post(`/user/create/`, {
        name: this.state.fields.first_name,
        last_name: this.state.fields.last_name,
        email: this.state.fields.email,
        password: this.state.fields.password,
        dni: this.state.fields.dni,
        cellphone: this.state.fields.cellphone,
      })
        .then(resp => {
          this.clear_fields(fields)
          success['msg'] = 'enviamos un email para su confirmacion.'
        })
        .catch(error => {
          if (error.request.response) {
            this.clear_fields(fields)
            success['msg'] = 'este email ya esta registrado.'
          }
        })

      this.setState({
        fields: fields,
        success: success,
      })
    }
  }

  validateForm() {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true
    let success = {}

    if (!fields['first_name']) {
      formIsValid = false
      errors['first_name'] = 'porfavor ingrese un nombre.'
    }

    if (typeof fields['first_name'] !== 'undefined') {
      if (!fields['first_name'].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false
        errors['first_name'] = 'porfavor ingrese un nombre valido.'
      }
    }

    if (typeof fields['last_name'] !== 'undefined') {
      if (!fields['last_name'].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false
        errors['last_name'] = 'porfavor ingrese un apillido valido.'
      }
    }

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

    if (!fields['password']) {
      formIsValid = false
      errors['password'] = 'porfavor ingrese una contraseña.'
    }

    if (typeof fields['password'] !== 'undefined') {
      if (
        !fields['password'].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/,
        )
      ) {
        formIsValid = false
        errors['password'] =
          'porfavor la contraseña debe contener letras Mayusculas numeros y caracteres especiales.'
      }
    }

    if (!fields['dni']) {
      formIsValid = false
      errors['dni'] = 'porfavor ingrese su cedula de identidad.'
    }

    if (!fields['cellphone']) {
      formIsValid = false
      errors['cellphone'] = 'porfavor ingrese un numero de celular.'
    }

    if (typeof fields['cellphone'] !== 'undefined') {
      if (!fields['cellphone'].match(/^[0-9 ]*$/)) {
        formIsValid = false
        errors['cellphone'] = 'porfavor ingrese un numero de celular valido.'
      }
    }

    this.setState({
      errors: errors,
      success: success,
    })

    return formIsValid
  }

  render() {
    return (
      <div className="cotizate-modal-reg">
        <div className="form-cotizate-reg">
          <h4 className="title-form-reg">
            <span className="title-welcome">BIENVENIDO A COTIZATE</span>
          </h4>

          <form
            method="POST"
            name="submitRegisterForm"
            className="form row"
            onSubmit={this.submitRegister}>
            <div className="form-group col-6">
              <label className="text-label">Nombre</label>

              <Input
                type={'text'}
                name={'first_name'}
                value={this.state.fields.first_name || ''}
                onChange={this.handleChange}
              />
              <div className="errorsMsg">{this.state.errors.first_name}</div>
            </div>
            <div className="form-group col-6">
              <label className="text-label">Apellido</label>
              <Input
                type={'text'}
                name={'last_name'}
                value={this.state.fields.last_name || ''}
                onChange={this.handleChange}
              />
              <div className="errorsMsg">{this.state.errors.last_name}</div>
            </div>
            <div className="form-group col-6">
              <label className="text-label">Email</label>
              <Input
                type={'email'}
                name={'email'}
                value={this.state.fields.email || ''}
                onChange={this.handleChange}
              />
              <div className="errorsMsg">{this.state.errors.email}</div>
            </div>
            <div className="form-group col-6">
              <label className="text-label">Cedula de Identidad</label>
              <Input
                type={'text'}
                name={'dni'}
                value={this.state.fields.dni || ''}
                onChange={this.handleChange}
              />
              <div className="errorsMsg">{this.state.errors.dni}</div>
            </div>
            <div className="form-group col-6">
              <label className="text-label">Numero de celular</label>
              <Input
                type={'number'}
                name={'cellphone'}
                value={this.state.fields.cellphone || ''}
                onChange={this.handleChange}
              />
              <div className="errorsMsg">{this.state.errors.cellphone}</div>
            </div>
            <div className="form-group col-6">
              <label className="text-label">Contraseña</label>
              <Password
                type={this.state.hidden ? 'password' : 'text'}
                value={this.state.fields.password || ''}
                name="password"
                onChange={this.handleChange}
                tshow={this.toogleShow}
              />
              <div className="errorsMsg">{this.state.errors.password}</div>
            </div>
            <div className="successMsg">
              <span>{this.state.success.msg}</span>
            </div>
            <div className="form-group text-terms col-12">
              <a href="/terms-and-contiditions">
                TERMINOS DE USO Y POLITICAS DE PRIVACIDAD
              </a>
            </div>
            <div className="form-group btn-reg-content col-12">
              <button className="btn btn-primary btn-reg">REGISTRARSE</button>
            </div>
            <div className="form-group btn-reg-content">
              <p className="text-iniciar">REGISTRARSE CON</p>
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
      </div>
    )
  }
}

export default FormRegister
