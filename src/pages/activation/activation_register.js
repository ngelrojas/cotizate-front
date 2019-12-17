import React from 'react'
import FooterHome from '../../footer/FooterComponent'
import API from '../../conf/api.js'


class ActivationRegister extends React.Component{

    constructor(){
        super()
        this.state = {
            is_activated: {} 
        }
    }
    
    getUrlParams = async e => {
        let uuid = this.props.match.params.uuid
        let token = this.props.match.params.token
        let msg = {}

        await API.put(`/user/activate/`+uuid+`/`+token)
            .then(resp => {
                console.log(resp)
                msg['message'] = 'su cuenta a sido activada, por favor complete su perfil para poder crear proyectos.'
                this.setState({is_activated: msg}) 
            })
            .catch(e => {
                console.log(e)
                msg['message'] = 'su cuenta no fue activada, por favor comuniquese con nuestro centro de atendimiento.'
                this.setState({is_activated: msg})
            })
    }

    componentDidMount(){
        this.getUrlParams() 
    }

    render(){
        return(
            <div className="container-site_on">
                <div className="container">
                    <div className="h5-center">
                        <h5 className="title-create">BIENVENIDO a COTIZATE</h5>
                    </div>    
                    <div className="h5-center">
                        <h5 className='title-create-sub'>
                            {this.state.is_activated.message} 
                        </h5>

                    </div>
                </div>

                <FooterHome />
            </div>
        ) 
    }
}

export default ActivationRegister
