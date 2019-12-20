import React from 'react'
import API from '../../conf/api.js'
import Tabs from '../tabs/Tabs.js'
import FooterPages from '../footer/footer.js'


class ProfileUser extends React.Component{

    constructor(){
        super()
        this.state = {
            data_user: {} 
        }
    }

    CurrentUser = () => {
        let token = window.sessionStorage.getItem('token')

        API.get(`/user/me`,{
            headers:{"Authorization": 'token '+ token}     
        }).then(resp => {
            console.log(resp)
            this.setState({data_user: resp.data}) 
        }).catch( e => {
            window.location = '/' 
        })
    }

    componentDidMount(){
        this.CurrentUser() 
    }

    render(){
        return(
            <div className="container-site_on">
                <div className="container">
                        
                    <div className="profile-container">
                        <div className="profile-header">
                        </div>

                        <div className="profile-body">
                            <Tabs>
                                <div label="Datos Personales">
                                    <div className="personal-data">
                                        persnal data
                                    </div>
                                </div>
                                <div label="Datos Personales Adicionales">
                                    <div className="personal-data-additional">
                                        personal data additional
                                    </div>
                                </div>
                            </Tabs>
                        </div> 

                    </div>
                </div>
                <FooterPages />

            </div>
        ) 
    }
}

export default ProfileUser