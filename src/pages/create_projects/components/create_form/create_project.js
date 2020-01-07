import React from 'react';
import {NavLink} from 'react-router-dom';
import FooterHome from '../../../../footer/FooterComponent'
import Tabs from '../../../tabs/Tabs.js'
import { StepOne  } from './step_one.js';
import { StepTwo } from './step_two.js';
import { StepFour } from './step_four.js';
import StepThree from './step_three.js';
import './create_project.css';
import API from '../../../../conf/api.js';
import URL_API from '../../../../conf/apis.js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';




class CreateProjectForm extends React.Component{

    constructor(){
        super();
        this.state = {
            fields: {},
            errors: {},
            categories: [],
        }
    }

        /*state = {
        editorState: undefined,
        contentState: {}
    };*/

    onContentStateChange(contentState) {
        
        console.log(contentState);
    };
    
    onContentStateChange_(contentState) {
        
        console.log(contentState);
    };
    
    _onContentStateChange_(contentState) {
        
        console.log(contentState);
    };

    getToken = () => {
        let token = window.sessionStorage.getItem('token');
        return token;
    }

    handleChange = e =>{
        e.preventDefault();
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({fields})
    }

    submitProject = async e => {
        e.preventDefault();
        
        let token = this.getToken();
        await API.put(`/campaing`,{
            title: this.state.fields.title,
            city: this.state.fields.city,
            budget: this.state.fields.budget,
            qty_days: this.state.fields.qty_days,
            facebook: this.state.fields.facebook,
            twitter: this.state.fields.twitter,
            linkedin: this.state.fields.linkedin,
            instagram: this.state.fields.instagram,
            website: this.state.fields.website,
            video: this.state.fields.video,
            excerpt: this.state.fields.excerpt,
            description: this.state.fields.description,
            tags: this.state.fields.tags,
            currencies: this.state.fields.currencies
        },{
            headers: {'Authorization': 'token ' + token}
        }).then(resp => {
            console.log(resp.data)
        }).catch(err => {
            console.log(err) 
        })

    }

    async getCategories(){
        const response = await fetch(URL_API + `/category/public/general`);
        const data = await response.json();
        this.setState({categories: data}); 
    }

    componentDidMount(){
        let token = this.getToken();
        if(token === null){
            window.location = '/'; 
        }

        this.getCategories() 
    }

    render(){
        const {categories} = this.state;
        return(
            <div className="container-site_on">
                <div className="title-steps">
                    <h4>Por favor siga todos los pasos para crear su proyecto.</h4>
                </div>
                <form method="post"> 
                    <Tabs>
                        
                        <div label="Basico">
                            <div className="row">
                                <StepOne 
                                    state={this.state} 
                                    handleChange={this.handleChange} 
                                    categories={categories} />
                            </div>
                        </div>

                        <div label="Historia">
                            <div className="row">
                                <StepTwo 
                                    state={this.state} 
                                    handleChange={this.handleChange}
                                    onContentStateChange={this.onContentStateChange}
                                    onContentStateChange_={this.onContentStateChange_}
                                    _onContentStateChange_={this._onContentStateChange_} />
                            </div>
                        </div>
                        
                        <div label="Recompensas">
                            <div className="row">
                                <StepFour 
                                    state={this.state} 
                                    handleChange={this.handleChange}
                                    onContentStateChange={this.onContentStateChange}
                                    onContentStateChange_={this.onContentStateChange_}
                                    _onContentStateChange_={this._onContentStateChange_} /> 
                            </div>
                        </div>
                   
                    </Tabs>
                </form> 

                <FooterHome />
            </div>
            
        )
    }
}

export default CreateProjectForm;
