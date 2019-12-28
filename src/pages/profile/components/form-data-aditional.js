import React from 'react'
import API from '../../../conf/api.js'


class PersonalDataAdd extends React.Component{

    constructor(){
        super()
        this.state = {
            fields: {} 
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

    validateForm(){
        let fields = {}
        let formIsValid = true

        return formIsValid

    }

    submitUpdateAdd = async e => {
        let token = window.sessionStorage.getItem('token')

       e.preventDefault()
       var today = new Date()
       var current_day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
       if (this.validateForm()){
           await API.put(`/user/biography/`,{
               update_at: current_day,
               address_2: this.state.fields.address_2,
               phone_number: this.state.fields.phone_number,
               email_2: this.state.fields.email_2,
               b_facebook: this.state.fields.b_facebook,
               b_twitter: this.state.fields.b_twitter,
               b_linkedin: this.state.fields.b_linkedin,
               b_instagram: this.state.fields.b_instagram,
               is_representative: this.state.fields.is_representative,
               personal_website: this.state.fields.personal_website,
               company_name: this.state.fields.company_name,
               company_nit: this.state.fields.company_nit,
               company_city: this.state.fields.company_city,
               compnay_phone: this.state.fields.company_phone,
               company_address: this.state.fields.company_address,
               company_email: this.state.fields.company_email,
               company_logo: this.sate.fields.company_logo,
               company_description: this.state.fields.company_description,
               company_facebook: this.state.fields.company_facebook,
               company_twitter: this.state.fields.company_twitter,
               company_linkedin: this.state.fields.company_linkedin,
               company_instagram: this.state.fields.compnay_instagram
           },{
                headers: {'Authorization': 'token ' + token}   
           }) 
       } 
   }  

    render(){
        return(
            <div className="wrapper-personal-data-add">
                <form method="POST" className="form form-update-add" onSubmit={this.submitUpdateAdd}>
                    <div className="form-inputs">
                        <h5>DATOS PERSONALES COMPLEMENTARIOS</h5> 
                    </div>
                    <div className="col-10 form-group">
                        <label>Direccion secundaria</label>
                        <input type="text" name="address2" onChange={this.handleChange} className="form-control" value={this.state.fields.address_2 || ''} />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Numero de Celular</label>
                        <input type="numeric" name="phone_number" onChange={this.handleChange} value={this.state.fields.phone_number || ''} className="form-control" />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Email Secundario</label>
                        <input type="email" name="email_2" onChange={this.handleChange} value={this.state.fields.email_2 || ''} className="form-control" />
                        
                    </div>
                    <div className="col-10 form-group form-inputs"> 
                        <label>Cuenta de Facebook</label> 
                        <input type="text" name="b_facebook"  onChange={this.handleChange} value={this.state.fields.b_facebook || ''} className="form-control" />
                        
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Cuenta de Twitter</label>
                        <input type="text" name="b_twitter"  onChange={this.handleChange} value={this.state.fields.b_twitter || ''} className="form-control" />
                        
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Cuenta de LinkdIn</label>
                        <input type="text" name="b_linkedin"  onChange={this.handleChange} value={this.state.fields.b_linkedin || ''} className="form-control" />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Cuenta de Instagram</label>
                        <input type="text" name="b_instagram"  onChange={this.handleChange} value={this.state.fields.b_instagram || ''} className="form-control" />
                       
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Respresentante</label>
                        
                        <input 
                            type="checkbox" 
                            className="checkbox" 
                            name="is_representative" 
                            onChange={this.handleChange}
                            value={this.state.fields.is_representative || ''}
                        />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Personal WebSite</label>
                        <input 
                            type="text" 
                            name="personal_website"  
                            onChange={this.handleChange} 
                            value={this.state.fields.personal_website || ''} 
                            className="form-control" 
                        />

                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Nombre de Compañia/Empresa</label>
                        <input type="text" name="company_name"  onChange={this.handleChange} value={this.state.fields.company_name || ''} className="form-control" /> 
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>NIT de Empresa/Compameñia</label>
                        <input type="text" name="company_nit"  onChange={this.handleChange} value={this.state.fields.company_nit || ''} className="form-control" /> 
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Ciudad de la Compañia/Empresa</label>
                        <input type="text" name="company_city"  onChange={this.handleChange} value={this.state.fields.company_city || ''} className="form-control" /> 
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Telefono de la Compañia/Empresa</label>
                        <input type="text" name="company_phone"  onChange={this.handleChange} value={this.state.fields.company_phone || ''} className="form-control" />
                        
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Direccion de la Compañia/Empresa</label>
                        <input type="text" name="company_address"  onChange={this.handleChange} value={this.state.fields.company_address || ''} className="form-control" />
                        
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Email de la Compañia/Empresa</label>
                        <input type="text" name="company_email"  onChange={this.handleChange} value={this.state.fields.company_email || ''} className="form-control" />
                        
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Logotipo Compañia/Empresa</label>
                        <input type="file" name="company_logo"  onChange={this.handleChange} value={this.state.fields.company_logo || ''} />
                        
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Descripcion de la Compañia/Empresa</label>
                        <input 
                            type="text" 
                            name="company_description"  
                            onChange={this.handleChange} 
                            value={this.state.fields.company_description || ''} 
                            className="form-control" 
                        />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Facebook de la Compañia/Empresa</label>
                        <input 
                            type="text" 
                            name="company_facebook"  
                            onChange={this.handleChange} 
                            value={this.state.fields.company_facebook || ''} 
                            className="form-control" 
                        />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Twitter de la Compañia/Empresa</label>
                        <input 
                            type="text" 
                            name="company_twitter"  
                            onChange={this.handleChange} 
                            value={this.state.fields.company_twitter || ''} 
                            className="form-control" />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>LinkdIn de la Compañia/Empresa</label>
                        <input 
                            type="text" 
                            name="company_linkedin"  
                            onChange={this.handleChange} 
                            value={this.state.fields.company_twitter || ''} 
                            className="form-control" 
                        />
                    </div>
                    <div className="col-10 form-group form-inputs">
                        <label>Instagram de la Compañia/Empresa</label>
                        <input 
                            type="text" 
                            name="company_instagram"  
                            onChange={this.handleChange} 
                            value={this.state.fields.company_instagram || ''} 
                            className="form-control" />
                    </div>
                    <div className="col-6 form-group form-inputs">
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </div>
                </form>
            </div>
        ) 
    }
}

export default PersonalDataAdd
