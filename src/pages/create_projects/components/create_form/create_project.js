import React from 'react';
import {NavLink} from 'react-router-dom';
import FooterHome from '../../../../footer/FooterComponent'
import Tabs from '../../../tabs/Tabs.js'
import BasicForm from './basic.js';
import HistoryForm from './history.js';
import RewardForm  from './reward.js';
import './create_project.css';
import API from '../../../../conf/api.js';
import URL_API from '../../../../conf/apis.js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';




class CreateProjectForm extends React.Component{

    constructor(){
        super();
        this.state = {
            fields: {},
        }
    }

    getToken = () => {
        let token = window.sessionStorage.getItem('token');
        return token;
    }

    componentDidMount(){
        let token = this.getToken();
        if(token === null){
            window.location = '/'; 
        }
    }

    render(){
        return(
            <div className="container-site_on">
                <div className="title-steps">
                    <h4>Por favor siga todos los pasos para crear su proyecto.</h4>
                </div>
                 
                    <Tabs>        
                        <div label="Basico">
                            <div className="row">
                                <BasicForm  />
                            </div>
                        </div>

                        <div label="Historia">
                            <div className="row">
                                <HistoryForm />
                            </div>
                        </div>   

                        <div label="Recompensas">
                            <div className="row">
                                <RewardForm /> 
                            </div>
                        </div>
                   
                    </Tabs>
                

                <FooterHome />
            </div>
            
        )
    }
}

export default CreateProjectForm;
