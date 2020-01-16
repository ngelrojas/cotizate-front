import React from 'react';
import API from '../../../../conf/api.js';
import API_URL from '../../../../conf/apis.js';
import '../../css/step-one.css';


class BasicForm extends React.Component{
    constructor(){
        super();
        this.state = {
            fields: {},
            errors: {},
            msg: '',
            categories: []
        }
    }

    handleChange = e => {
        e.preventDefault();
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({fields}); 
    }

    async getCategories(){
        const response = await fetch(API_URL + `/category/public/general`);
        const data = await response.json();
        this.setState({categories: data})
    } 

    componentDidMount(){
        this.getCategories(); 
    }

    handleSubmit = e => {
        e.preventDefault();

        let msg = ''

        if(this.validateForm()){
            let fieldArray = [
                this.state.fields.title,
                this.state.fields.city,
                this.state.fields.category,
                this.state.fields.budget,
                this.state.fields.currencies,
                this.state.fields.qty_days,
                this.state.fields.facebook,
                this.state.fields.instagram,
                this.state.fields.linkedin,
                this.state.fields.twitter,
                this.state.fields.website
            ]

            window.localStorage.setItem("basic", JSON.stringify(fieldArray));
            msg = 'primera parte del proyecto guardado. '
            this.setState({
                msg: msg     
            }) 
        }
        

    }

    validateForm(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        let msg = {}

        if(!fields["title"]){
            formIsValid = false;
            errors["title"] = "Tu proyecto debe contener un titulo.";
        }

        if(!fields["city"]){
            formIsValid = false;
            errors["city"] = "Tu proyecto debe tener una ciudad."
        }

        if(!fields["category"]){
            formIsValid = false;
            errors["category"] = "Tu proyecto debe pertenecer a una categoria.";
        }

        if(!fields["budget"]){
            formIsValid = false;
            errors["budget"] = "Tu proyecto debe tener una cantidad de dinero.";
        }

        if(!fields["currencies"]){
            formIsValid = false;
            errors["currencies"] = "Tu proyecto debe contener una moneda.";
        }

        if(!fields["qty_days"]){
            formIsValid = false;
            errors["qty_days"] = "Tu proyecto debe contener una cantidad de dias.";
        }

        this.setState({
            errors: errors
        });

        return formIsValid;
    }

    render(){
        const { categories } = this.state;
        return(
            <div className="container-site_on">
                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="container form-step-one">
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Cual es el Titulo del Proyecto ?</span>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.fields.title || ''}
                                name="title"
                                onChange={this.handleChange}/>
                            </label>
                            <div className="errorsMsg">{this.state.errors.title}</div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">De donde es tu proyecto ?</span>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.fields.city || ''}
                                name="city"
                                onChange={this.handleChange}/>
                            </label>
                            <div className="errorsMsg">{this.state.errors.city}</div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Cual es la Categoria de tu proyecto ?</span>
                            <select
                                className="form-control"
                                value={this.state.fields.category || ''}
                                name="category"
                                onChange={this.handleChange}>
                                <option>Seleccionar categoria</option>
                                {
                                    categories && categories.map( category => (
                                    <option value={category.id} key={category.id}>{category.name}</option> )) 
                                }
                            </select>
                        </label>
                        <div className="errorsMsg">{this.state.errors.category}</div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-6"><span className="form-sub-title">Cuanto dinerp necesitas para tu proyecto ?</span>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.fields.budget || ''}
                                name="budget"
                                onChange={this.handleChange}/>
                            </label>
                            <label className="col-md-2"><span className="form-sub-title">Moneda:</span>
                            <select 
                                className="form-control"
                                name="currencies"
                                value={this.state.fields.currencies || ''}
                                onChange={this.handleChange}>
                                    <option value=''>Seleccionar</option>
                                    <option value='1'>Bolivianos</option>
                                    <option value='2'>Dolares</option>
                                </select>
                                <div className="errorsMsg">{this.state.errors.currencies}</div>
                            </label>
                            <div className="errorsMsg">{this.state.errors.budget}</div>
                            
                        </div>

                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Cuantos dias será la duracion de la campaña ?</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={this.state.fields.qty_days || ''}
                                name="qty_days"
                                onChange={this.handleChange}
                            />
                        </label>
                        <div className="errorsMsg">{this.state.errors.qty_days}</div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Adicione sus redes sociales (opcional)</span>
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">facebook</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={this.state.fields.facebook || ''}
                                name="facebook"
                                onChange={this.handleChange}
                            />
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">instagram</span>
                            <input 
                                type="text"
                                className="form-control"
                                value={this.state.fields.instagram || ''}
                                name="instagram"
                                onChange={this.handleChange}
                            />
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">linkedIn</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={this.state.fields.linkedin || ''}
                                name="linkedin"
                                onChange={this.handleChange}
                            />
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">twitter</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={this.state.fields.twitter || ''}
                                name="twitter"
                                onChange={this.handleChange}
                            />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Website</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={this.state.fields.website || ''}
                                name="website"
                                onChange={this.handleChange}
                            />
                            </label>
                        </div>

                    </div>
                    <div className="container">
                        <div className="col col-md-8">
                            <div className="successMsg">{this.state.msg}</div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="col col-md-8">
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        ) 
    }
}

export default BasicForm;
