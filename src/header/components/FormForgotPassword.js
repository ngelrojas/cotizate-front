import React, {Component} from 'react';
import '../css/forgotpwd.css';


class ForgotPassword extends Component
{

    render(){
        return(
            <div className="form-forgot-pwd container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="fpw-title">Recuperar Contraseña</h3>
                    </div>
                </div>
                <div className="d-flex content-justify-center">
                    <form action="" className="form">
                        <div className="form-group col-12">
                            <label>
                                INGRESE SU EMAIL
                                <input type="email" className="col col-12 form-control-fpwd" />
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-12 content-btn-fpwd">
                                <button className="btn btn-primary btn-fpw">Enviar</button>
                            </div>
                            
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default ForgotPassword;