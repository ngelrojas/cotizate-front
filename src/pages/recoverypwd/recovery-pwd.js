import React from 'react'
import API from '../../conf/api.js'
import { Password } from '../../header/components/pwd/password.js'
import FooterHome from '../../footer/FooterComponent'
import './css/recoverypwd.css'


class RecoveryPassword extends React.Component{

    constructor(){
        super()
        this.state = {
            fields: {},
            errors: {},
            hidden: true,
            hidden_conf: true
        }
    }

    handleChange = e => {
        e.preventDefault()
        let fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({
            fields 
        })
    
    }

    toogleShow = () =>{
        this.setState({
            hidden: !this.state.hidden 
        })
    }

    toogleShow_confirm = () => {
        this.setState({
            hidden_conf: !this.state.hidden_conf 
        }) 
    }

    validateForm(){
        let fields = this.state.fields
        let errors = {}
        let formIsValid = true

        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "porfavor ingrese una contraseña."
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                let msg_error = "porfavor la contraseña debe contener letras Mayusculas, numeros y/o "
                let msg_error_1 = "algunos de los siguientes caracteres especiales como: "
                let msg_error_2 = "@, #, $, %, &"
                errors["password"] = msg_error + msg_error_1 + msg_error_2 
            }
        }

        if(fields["password"] !== fields["password_confirm"]){
            formIsValid = false
            errors["password"] = "la contraseña deben ser la misma."
        }

        this.setState({
            errors: errors 
        })

        return formIsValid

    }

    submitRecoveryPassword = async e => {
        e.preventDefault()

        if(this.validateForm()){
            let fields = {}
            let success = {}
            let errors = {}
            let uuid = this.props.match.params.uuid

            await API.put(`user/recovery-password-confirm/`,{
                uid: uuid,
                password: this.state.fields.password,
                password_confirmation: this.state.fields.password_confirm
            }).then(resp => {
                errors['msg'] = "su contraseña se actualizo correctamente."
                this.setState({errors: errors})
                window.location = '/'

            }).catch(err => {
                errors['msg'] = "verifique su contraseña porfavor"
                this.setState({erros: errors})
            })
        }
    }

    render(){
        return(
            <div className="send-forgot-pwd">
                <div className="recovery-pwd container">
                <div className="row">
                    <h3>Porfavor ingrese su nueva contraseña.</h3>
                </div>
                <div className="send-forgot-pwd__body">
                    <div className="col-12 d-flex content-justify-center">
                        <form method="POST" className="form col-12" onSubmit={this.submitRecoveryPassword}>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <Password
                                    type={this.state.hidden ? "password": "text"}
                                    value={this.state.fields.password || ''}
                                    name="password"
                                    onChange={this.handleChange}
                                    tshow={this.toogleShow}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirme su contraseña</label>
                                <Password
                                    type={this.state.hidden_conf ? "password": "text"}
                                    value={this.state.fields.password_confirm || ''}
                                    name="password_confirm"
                                    onChange={this.handleChange}
                                    tshow={this.toogleShow_confirm}
                                />
                            </div>
                            <div className="errorLogin">{this.state.errors.msg}</div> 
                            <div className="errorLogin">{this.state.errors.password}</div> 
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
                <FooterHome />
            </div>
        ) 
    }

}

export default RecoveryPassword
