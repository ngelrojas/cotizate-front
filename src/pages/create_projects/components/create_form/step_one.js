import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import FooterHome from '../../../../footer/FooterComponent'
import bannerhome from '../../../home/img/cotizate-tech.png';
import '../../css/step-one.css';


class StepOne extends Component
{
    render(){
        return(
            <div className="container-site_on">
                <div className="container-slider">
                    <div className="container-slider-2">
                        <img src={bannerhome} className="d-block w-100" alt="cotizate"/>
                    </div>
                </div>
                <div className="container">
                    <form action="/" className="form-step-one">
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">1.- Cual es el Titulo del Proyecto ?</span>
                                <input type="text" className="form-control" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">2.- Cual es la Categoria de tu proyecto ?</span>
                                <select className="form-control">
                                    <option>select</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">3.- De donde es tu proyecto ?</span>
                                <input type="text" className="form-control" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">4.- Cuanto dinero necesitas para tu proyecto ?</span>
                                <input type="text" className="form-control" />
                            </label>
                            <label className="col-md-2"><span className="form-sub-title">Moneda:</span>
                            <select className="form-control">
                                    <option>Dolares</option>
                                    <option>Bolivianos</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">5.- Cuantos dias será la duracion de la campaña ?</span>
                                <input type="text" className="form-control" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">6.- Adicione sus redes sociales (opcional)</span>
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">facebook</span>
                                <input type="text" className="form-control" />
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">instagram</span>
                                <input type="text" className="form-control" />
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">linkedIn</span>
                                <input type="text" className="form-control" />
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">twitter</span>
                                <input type="text" className="form-control" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Website</span>
                                <input type="text" className="form-control" />
                            </label>
                        </div>
                        <div className="form-group justify-cotizate">
                            <NavLink to="step-two" className="btn-step-one btn btn-primary btn-lg">SIGUIENTE</NavLink>
                        </div>

                    </form>
                </div>

                <FooterHome />
            </div>
            
        )
    }
}

export default StepOne;