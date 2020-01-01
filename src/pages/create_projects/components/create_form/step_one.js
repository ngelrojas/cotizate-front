import React from 'react';
import Tabs from '../../../tabs/Tabs.js';
import API from '../../../../conf/api.js';
import '../../css/step-one.css';


export const StepOne =({state, handleChange, categories}) => {
        console.log('here')
        console.log(categories)
        return(
            <div className="container-site_on"> 
                
                    <div className="container form-step-one">
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">1.- Cual es el Titulo del Proyecto ?</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={state.fields.title || ''}
                                name="title"
                                onChange={handleChange}/>
                            </label>
                            <div className="errorMsg">{state.errors.title}</div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">2.- Cual es la Categoria de tu proyecto ?</span>
                            <select 
                                className="form-control" 
                                value={state.fields.category || ''}
                                name="category"
                                onChange={handleChange}>
                                {categories &&
                                    categories.map(category =>(
                                        <option key={category.id} value={category.id}>{category.name}</option> 
                                    )) 
                                } 
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">3.- De donde es tu proyecto ?</span>
                            <input 
                                type="text" 
                                className="form-control"
                                name="city"
                                value={state.fields.city || ''}
                                onChange={handleChange}
                            />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">4.- Cuanto dinero necesitas para tu proyecto ?</span>
                            <input 
                                type="text" 
                                className="form-control"
                                name="budget"
                                value={state.fields.budget || ''}
                                onChange={handleChange}
                            />
                            </label>
                            <label className="col-md-2"><span className="form-sub-title">Moneda:</span>
                            <select 
                                className="form-control"
                                value={state.fields.currencies || ''}
                                name="currencies"
                                onChange={handleChange}>
                                    <option value="1">Bolivianos</option>
                                    <option value="2">Dolares</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">5.- Cuantos dias será la duracion de la campaña ?</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={state.fields.qty_days}
                                name="qty_days"
                                onChange={handleChange}
                            />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">6.- Adicione sus redes sociales (opcional)</span>
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">facebook</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={state.fields.facebook || ''}
                                name="facebook"
                                onChange={handleChange}
                            />
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">instagram</span>
                            <input 
                                type="text"
                                className="form-control"
                                value={state.fields.instagram || ''}
                                name="instagram"
                                onChange={handleChange}
                            />
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">linkedIn</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={state.fields.linkedin || ''}
                                name="linkedin"
                                onChange={handleChange}
                            />
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">twitter</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={state.fields.twitter || ''}
                                name="twitter"
                                onChange={handleChange}
                            />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Website</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={state.fields.website || ''}
                                name="website"
                                onChange={handleChange}
                            />
                            </label>
                        </div>

                    </div>
            </div>
            
        )
    
}

export default StepOne;
