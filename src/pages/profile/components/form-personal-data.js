import React from 'react'
import API from '../../../conf/api.js'
import { Password } from '../../../header/components/pwd/password.js'

class PersonalData extends React.Component{

    constructor(){
        super()
        this.state = {
            fields: {},
            fields_pwd: {},
            errors: {},
            data_user: {},
            hidden: true
        }
    }

    handleChange = e =>{
        e.preventDefault();
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields 
        })
    }

    handleChangepwd = e => {
        e.preventDefault()
        let fields_pwd = this.state.fields_pwd;
        fields_pwd[e.target.name] = e.target.value
        this.setState({
            fields_pwd 
        })
    }

    toogleShow = () => {
        this.setState({
            hidden: !this.state.hidden 
        }) 
    }

    getPersonalData = () => { 

        let is_token = window.sessionStorage.getItem('token')
        API.get(`/user/me`, {
            headers: {'Authorization': 'token '+is_token} 
        }).then(ans => {
            this.setState({fields: ans.data})
            
        }).catch(err => {
            console.log(err) 
        })
    }

    validateForm(){
        let fields = this.state.fields
        let errors = {}
        let formIsValid = true

        if(!fields["name"]){
            formIsValid = false
            errors["name"] = "porfavor ingrese un nombre."
        }

        if(typeof fields["name"] !== "undefined"){
            if(!fields["name"].match(/^[a-zA-Z ]*$/)){
                formIsValid = false
                errors["name"] = "porfavor ingrese un nombre valido."
            } 
        }

        if(typeof fields["last_name"] !== "undefined"){
            if(!fields["last_name"].match(/^[a-zA-Z ]*$/)){
                formIsValid = false
                errors["last_name"] = "porfavor ingrese un apillido valido."
            } 
        }

        if(!fields["email"]){
            formIsValid = false
            errors["email"] = "porfavor ingrese un email."
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
              formIsValid = false;
              errors["email"] = "porfavor ingrese un email valido.";
            }
        }

         if(!fields["dni"]){
            formIsValid = false
            errors["dni"] = "porfavor ingrese su cedula de identidad."
        }

        if(!fields["cellphone"]){
            formIsValid = false
            errors["cellphone"] = "porfavor ingrese un numero de celular."
             
        }

        if(typeof fields["cellphone"] !== "undefined"){
            if(!fields["cellphone"].match(/^[0-9 ]*$/)){
                formIsValid = false
                errors["cellphone"] = "porfavor ingrese un numero de celular valido."
            } 
        }

        this.setState({
            errors: errors 
        })

        return formIsValid

    }

    validateForm_pwd(){
        let fields_pwd = this.state.fields_pwd;
        let errors = {}
        let formIsValid = true

        if (!fields_pwd["password"]) {
            formIsValid = false;
            errors["password"] = "porfavor ingrese una contraseña.";
        }

        if (typeof fields_pwd["password"] !== "undefined") {
            if (!fields_pwd["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
              formIsValid = false;
              errors["password"] = "porfavor la contraseña debe contener letras Mayusculas numeros y caracteres especiales.";
            }
        }

        if(fields_pwd["password"] !== fields_pwd["password_confirm"]){
            formIsValid = false
            errors["password_confirm"] = "las contraseñas deben coincidir."
        }

        this.setState({
            errors: errors 
        })

        return formIsValid
    }

    submitUpdatePwd = async e => {
        e.preventDefault()
        let token = window.sessionStorage.getItem('token')
        
        if(this.validateForm_pwd()){
            let fields_pwd = {}
            let success = {}

            await API.put('/user/me/password-update/', { 
                    password: this.state.fields_pwd.password,
                    password_confirm: this.state.fields_pwd.password_confirm
                },{
                    headers:{ 'Authorization': 'token '+ token }
                    
                }).then(ans => {
                    success['msg_pwd'] = 'su contraseña fue actualizada.'
                    this.setState({errors: success})
                    fields_pwd["password"] = ""
                    fields_pwd["password_confirm"] = ""

                }).catch(err => {

                    success['msg_pwd'] = 'asegurate que las contraseña sea valida.'
                    this.setState({errors: success})
                    fields_pwd["password"] = ""
                    fields_pwd["password_confirm"] = ""
                })

            this.setState({fields_pwd: fields_pwd})
        }

    }



    submitUpdate = async e => {
        e.preventDefault()
        let token = window.sessionStorage.getItem('token')

        if(this.validateForm()){
            let fields = {}
            let success = {}
            console.log(this.state.fields)
            await API.put(`/user/me/`,{
                name: this.state.fields.name,
                last_name: this.state.fields.last_name,
                dni: this.state.fields.dni,
                cellphone: this.state.fields.cellphone,
                address: this.state.fields.address,
                email: this.state.fields.email,
                photo: ''
            },{
                headers: {
                    'Authorization': 'token '+ token 
                } 
            }).then(ans => {
                console.log(ans)
                success['msg'] = 'sus datos se actualizaron correctamente.'
                this.setState({errors: success})
            }).catch(err => {
                console.log(err) 
            })
        }

    }
    
    componentDidMount(){
        this.getPersonalData() 
    }

    render(){
        return(
            <div className="wrapper-personal-data">
                
                <form method="POST" className="form form-update" onSubmit={this.submitUpdate}>
                    <div className="form-inputs">
                        <h5>DATOS PERSONALES</h5>
                    </div>
                    <div className="col-10 form-group">
                        <label>Foto</label>
                        <input type="file" name="photo" />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Nombre</label>
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.fields.name || ''} className="form-control" /> </div>
                        <div className="errorMsg">{this.state.errors.name}</div>
                    <div className="col-10 form-group form-inputs">
                        <label>Apellido</label>
                        <input type="text" name="last_name" onChange={this.handleChange} value={this.state.fields.last_name || ''} className="form-control" />
                        <div className="errorMsg">{this.state.errors.last_name}</div>
                    </div>
                    <div className="col-10 form-group form-inputs"> 
                        <label>DNI</label> 
                        <input type="text" name="dni"  onChange={this.handleChange} value={this.state.fields.dni || ''} className="form-control" />
                        <div className="errorMsg">{this.state.errors.dni}</div>
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Celular</label>
                        <input type="text" name="cellphone"  onChange={this.handleChange} value={this.state.fields.cellphone || ''} className="form-control" />
                        <div className="errorMsg">{this.state.errors.cellphone}</div>
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Direccion</label>
                        <input type="text" name="address"  onChange={this.handleChange} value={this.state.fields.address || ''} className="form-control" />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Email</label>
                        <input type="email" name="email"  onChange={this.handleChange} value={this.state.fields.email || ''} className="form-control" />
                        <div className="errorMsg">{this.state.errors.email}</div>
                    </div>
                    <div className="col-12 successMsg">{this.state.errors.msg}</div>
                    <div className="col-6 form-group form-inputs">
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </div>
                </form>

                <form className="form-update-pwd" onSubmit={this.submitUpdatePwd} method="POST">
                    <div className="form-inputs">
                        <h5>ACTUALIZAR CONTRASEÑA</h5>
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Contraseña</label>
                        <Password
                            type={this.state.hidden ? "password": "text"}
                            value={this.state.fields_pwd.password || ''}
                            name="password"
                            onChange={this.handleChangepwd}
                            tshow={this.toogleShow}
                        />
                        <div className="errorsMsg">{this.state.errors.password}</div>
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Repetir Contraseña</label>
                        
                        <Password
                            type={this.state.hidden ? "password" : "text"}
                            value={this.state.fields_pwd.password_confirm || ''}
                            name="password_confirm"
                            onChange={this.handleChangepwd}
                            tshow={this.toogleShow}
                        />
                        <div className="errorsMsg">{this.state.errors.password_confirm}</div>
                    </div>
                    <div className="col-12 successMsg_pwd">{this.state.errors.msg_pwd}</div>
                    <div className="col-6 form-group">
                        <button type="submit" className="btn btn-primary">Actualizar Contraseña</button>
                    </div>
                </form>
            </div>
        ) 
    }
}

export default PersonalData 
