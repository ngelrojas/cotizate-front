import React from 'react'
import API from '../../conf/api.js'
import {Input} from '../components/input/input.js'
import '../css/forgotpwd.css'

class ForgotPassword extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: {},
      errors: {},
    }
  }

  handleChange = e => {
    e.preventDefault()
    let fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({fields})
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

  submitRecoveryPwd = async e => {
    e.preventDefault()

    if (this.validateForm()) {
      let errors = {}
      await API.post(`/user/recovery-password/`, {
        email: this.state.fields.email,
      })
        .then(resp => {
          let msg =
            'Enviamos un email, para que pueda actualizar su contraseña a: '
          let resp_email = resp.data.email
          errors['success'] = msg + resp_email

          this.setState({
            errors: errors,
          })
        })
        .catch(err => {
          console.log(err.request.status)
          if (err.request.status === 404) {
            console.log('here 404')
            errors['msg'] = 'Email no registrado.'
          }
        })

      this.setState({
        errors: errors,
      })
    }
  }

  render() {
    return (
      <div className="form-forgot-pwd container">
        <div className="row">
          <div className="col-12">
            <h3 className="fpw-title">Recuperar Contraseña</h3>
          </div>
        </div>
        <div className="col-12 d-flex content-justify-center">
          <form
            method="POST"
            onSubmit={this.submitRecoveryPwd}
            className="form col-12">
            <div className="form-group col-12">
              <label className="label-email">
                INGRESE SU EMAIL
                <Input
                  type={'email'}
                  name={'email'}
                  value={this.state.fields.email || ''}
                  onChange={this.handleChange}
                />
              </label>
              <div className="errorLogin">{this.state.errors.email}</div>
              <div className="errorLogin">{this.state.errors.msg}</div>
              <div className="errorLogin">{this.state.errors.success}</div>
            </div>
            <div className="row">
              <div className="col-12 content-btn-fpwd">
                <button className="btn btn-primary btn-fpw">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ForgotPassword
