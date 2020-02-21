import React, {Component} from 'react';


class RewardComponent extends Component
{
    render(){
        return(
            <div>
                <div className="box-contributions">
                    <h5 className="box-txt d-flex justify-content-center">RECOMPESAS</h5>
                    <div className="box-contributions-general">
                        <h5 className="box-ctb-txt d-flex justify-content-center">Recompensa 1</h5>
                        <div className="row">
                            <div className="col-6 box-contributions-1">
                                <span>USD 1000</span>
                            </div>
                            <div className="col-6 box-contributions-2">
                                <span>Contribuidores 20</span>
                            </div>
                            <div className="col-12 box-contributions-3">
                                <div className="d-flex justify-content-center"><span>1 Tarro de polen de 250 gr</span></div>
                                <div className="d-flex justify-content-center"><span>1 Tarro de polen de 250 gr</span></div>
                                <div className="d-flex justify-content-center"><span>1 Tarro de polen de 250 gr</span></div>
                
                            </div> 
                            <div className="col-12 box-contributions-4">
                                <p>Un tarro de polen de 250 gr.<br/>
                                apoya con usd 10 y reciba</p>
                            </div>  
                            <div className="col-12 box-contributions-3">
                                <span>Entrega estimada en Febrero 2020</span>
                            </div>
                            <div className="col-12 box-contributions-list">
                                <p>entrega solo en sucre</p>
                                <p>por correos</p>
                            </div>
                            <div className="col-12 box-contributions-bnt d-flex justify-content-center">
                                <button className="btn btn-warnings btn-lg btn-contributions">CONTRIBUIR</button>
                            </div>

                        </div>


                    </div>         
                </div>                
            </div>
        )
    }
}

export default RewardComponent;