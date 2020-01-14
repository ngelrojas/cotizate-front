import React from 'react'
import API from '../../../conf/api.js'
import { MdInfoOutline } from 'react-icons/md'
import { Tooltip } from '../../tools/tooltip/tooltip.js'


class PersonalDataAdd extends React.Component{

    constructor(){
        super()
        this.state = {
            fields: {},
            isChecked: false,
            msg: ''
        }    
    }

    toogleChecked = () =>{ 
        this.setState({
            isChecked: !this.state.isChecked  
        }) 
    }

    getPersonalDataAdd(){
        
        let token = window.sessionStorage.getItem('token')

        API.get(`/user/biography/`,{
            headers: { 'Authorization': 'token ' + token } 
        }).then(resp => {
            this.setState({fields: resp.data}) 
        }).catch(err => {
            console.log(err) 
        })
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
        let formIsValid = true

        return formIsValid

    }

    submitUpdateAdd = async e => {
        e.preventDefault()

        let token = window.sessionStorage.getItem('token')
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
               company_phone: this.state.fields.company_phone,
               company_address: this.state.fields.company_address,
               company_email: this.state.fields.company_email,
               company_logo: this.state.fields.company_logo,
               company_description: this.state.fields.company_description,
               company_facebook: this.state.fields.company_facebook,
               company_twitter: this.state.fields.company_twitter,
               company_linkedin: this.state.fields.company_linkedin,
               company_instagram: this.state.fields.company_instagram
           },{
                headers: {'Authorization': 'token ' + token}   
           }).then(res => {
                this.setState({msg: 'sus datos se actualizaron correctament.'})
                console.log(res) 
                }).catch(err => {
                    this.setState({msg: 'por favor revise que todos los campos esten completos.'})
                console.log(err) 
           })
       } 
    } 

    componentDidMount(){
        this.getPersonalDataAdd() 
    }

    render(){
        return(
            <div className="wrapper-personal-data-add">
                <form method="POST" className="form form-update-add" onSubmit={this.submitUpdateAdd}>
                    <div className="form-inputs">
                        <h4><Tooltip label='DATOS PERSONALES COMPLEMENTARIOS' text={'todos los datos son obligatorios'} /></h4>
                        
                    </div>
                    <div className="row"> 
                    <div className="col-6 form-side-lef">
                        <div className="col-10 form-group form-inputs"> 
                            <Tooltip label={'Direccion secundaria'} text={'aqui el mensaje'} />
                            <input 
                                type="text" 
                                name="address_2" 
                                onChange={this.handleChange} 
                                className="form-control" 
                                value={this.state.fields.address_2 || ''} 
                            />
                        </div>
                        <div className="col-10 form-group form-inputs"> 
                            <Tooltip label={'Numero de Celular'} text={'aqui el texto'} />
                            <input 
                                type="numeric" 
                                name="phone_number" 
                                onChange={this.handleChange} 
                                value={this.state.fields.phone_number || ''} 
                                className="form-control" 
                            />
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Email Secundario'} text={'aqui el texto'} />
                            <input 
                                type="email" 
                                name="email_2" 
                                onChange={this.handleChange} 
                                value={this.state.fields.email_2 || ''} 
                                className="form-control" 
                            />
                            
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Cuenta de Facebook'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="b_facebook"  
                                onChange={this.handleChange} 
                                value={this.state.fields.b_facebook || ''} 
                                className="form-control" 
                            />
                            
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Cuenta de Twitter'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="b_twitter"  
                                onChange={this.handleChange} 
                                value={this.state.fields.b_twitter || ''} 
                                className="form-control" 
                            />
                            
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Cuenta de LinkdIn'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="b_linkedin"  
                                onChange={this.handleChange} 
                                value={this.state.fields.b_linkedin || ''} 
                                className="form-control" 
                            />
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Cuenta de Instagram'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="b_instagram"  
                                onChange={this.handleChange} 
                                value={this.state.fields.b_instagram || ''} 
                                className="form-control" 
                            />
                           
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Representante'} text={'aqui el texto'} />
                            <input 
                                type="checkbox" 
                                className="checkbox" 
                                name="is_representative" 
                                onChange={this.toogleChecked}
                                defaultChecked={this.state.fields.is_representative ? this.state.isChecked : this.state.isChecked }
                                value={this.state.fields.is_representative || ''}
                            />
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Personal WebSite'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="personal_website"  
                                onChange={this.handleChange} 
                                value={this.state.fields.personal_website || ''} 
                                className="form-control" 
                            />

                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Nombre Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_name"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_name || ''} 
                                className="form-control" 
                            /> 
                        </div>
                    </div>

                    <div className="col-6 form-side-righ">
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'NIT Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_nit"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_nit || ''} 
                                className="form-control" 
                            /> 
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Ciudad Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_city"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_city || ''} 
                                className="form-control" 
                            /> 
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Telefono Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_phone"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_phone || ''} 
                                className="form-control" />
                            
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Direccion Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_address"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_address || ''} 
                                className="form-control" 
                            />
                            
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Email Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_email"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_email || ''} 
                                className="form-control" 
                            />
                            
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Logotipo Compañia/Empresa'} text={'aqui el texto'} />
                            <div className="img-company-logo">
                                <img src={this.state.fields.company_logo || ''} alt="cotizate" />
                            </div>
                            <input type="file" name="company_logo"  onChange={this.handleChange}  />
                            
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Descripcion Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_description"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_description || ''} 
                                className="form-control" 
                            />
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Facebook Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_facebook"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_facebook || ''} 
                                className="form-control" 
                            />
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Twitter Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_twitter"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_twitter || ''} 
                                className="form-control" />
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'LinkdIn Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_linkedin"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_linkedin || ''} 
                                className="form-control" 
                            />
                        </div>
                        <div className="col-10 form-group form-inputs">
                            <Tooltip label={'Instagram Compañia/Empresa'} text={'aqui el texto'} />
                            <input 
                                type="text" 
                                name="company_instagram"  
                                onChange={this.handleChange} 
                                value={this.state.fields.company_instagram || ''} 
                                className="form-control" />
                        </div>
                    </div>
                </div>
                    <div className="col-12 msg_gen">{this.state.msg}</div>
                    <div className="col-6 form-group form-inputs">
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </div>
                </form>
            </div>
        ) 
    }
}

export default PersonalDataAdd
