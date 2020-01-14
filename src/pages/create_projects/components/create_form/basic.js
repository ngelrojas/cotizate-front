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

    render(){
        const { categories } = this.state;
        return(
            <div className="container-site_on">
                <form method="post">
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
                                onChange={this.handleChange}>
                                    <option value={this.state.fields.currencies || '1'}>Bolivianos</option>
                                    <option value={this.state.fields.currencies || '2'}>Dolares</option>
                                </select>
                            </label>
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
                </form>
            </div>
        ) 
    }
}

export default BasicForm;
