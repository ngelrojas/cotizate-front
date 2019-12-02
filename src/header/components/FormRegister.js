import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import facebook from '../../footer/img/facebook.svg';
import linkedin from '../../footer/img/linkedin.svg';
import twitter from '../../footer/img/twitter.svg';
import instagram from '../../footer/img/instagram.svg';
import './css/validation.css';


class FormRegister extends Component
{
    constructor(){
        super()
        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.submitRegister = this.submitRegister.bind(this)
    }

    handleChange(e){
        e.preventDefault()
        let fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({
            fields 
        })
    }

    submitRegister(e){
        e.preventDefault()
        if(this.validateForm()){
            let fields = {}
            fields["first_name"] = ""
            fields["last_name"] = ""
            fields["email"] = ""
            fields["password"] = ""
            fields["repeat_password"] = ""
            this.setState({fields: fields})
        }
    }

    validateForm(){
        let fields = this.state.fields
        let errors = {}
        let formIsValid = true
        console.log(fields["first_name"])
        if(!fields["first_name"]){
            formIsValid = false;
            errors["first_name"] = "*porfavor ingrese un nombre"
        }

        if(typeof fields["first_name"] !== "undefined"){
            if(!fields["first_name"].match(/^[a-zA-Z ]*$/)){
                formIsValid = false
                errors["first_name"] = "porfavor ingrese nombres validos"
            } 
        }

        this.setState({
            errors: errors 
        })

        return formIsValid
    }

    render(){
        return(
                <div className="cotizate-modal-reg">
                    <div className="form-cotizate-reg">
                        <h4 className="title-form-reg"><span className="title-welcome">BIENVENIDO A COTIZATE</span></h4>
                        
                        <form method="POST" name="submitRegisterForm" className="form row" onSubmit={this.submitRegister}>
                            <div className="form-group col-6">
                                <label className="text-label">Nombre</label>
                                <input type="text" 
                                       name="first_name" 
                                       value={this.state.fields.first_name} 
                                       onChange={this.handleChange} 
                                       className="form-control form-control-reg" />
                                <div className="errorsMsg">{this.state.errors.first_name}</div>
                            </div>
                            <div className="form-group col-6">
                                <label className="text-label">Apellido</label>
                                <input type="text" name="last_name" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group col-6">
                                <label className="text-label">Email</label>
                                <input type="text" name="email" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group col-6">
                                <label className="text-label">Contraseña</label>
                                <input type="password" name="password" className="form-control form-control-reg"/>
                            </div>
                            <div className="form-group col-6">
                                <label className="text-label">Repetir Contraseña</label>
                                <input type="password" name="repeat_password" className="form-control form-control-reg"/>
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
