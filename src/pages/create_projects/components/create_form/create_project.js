import React from 'react';
import {NavLink} from 'react-router-dom';
import FooterHome from '../../../../footer/FooterComponent'
import Tabs from '../../../tabs/Tabs.js'
import StepOne from './step_one.js';
import StepTwo from './step_two.js';
import StepThree from './step_three.js';
import './create_project.css';
import API from '../../../../conf/api.js';


class CreateProjectForm extends React.Component{

    constructor(){
        super();
        this.state = {
            fields: {},
            errors: {},
            categories: [],
        }
    }

    handleChange(e){
        e.preventDefault();
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({fields})
    }

    submitProject = async e => {
        e.preventDefault();
        
        let token = window.sessionStorage.getItem('token');
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

    getCategories = () => {
        API.get(`/category/public/general`)
            .then(resp => {
                console.log(resp.data)
                let data = JSON.parse(resp.data)
                this.setState({categories: data})
            }).catch(err => {
                console.log(err) 
            })
       }

    componentDidMount(){
        this.getCategories() 
    }

    render(){
        return(
            <div className="container-site_on">
                <div className="title-steps">
                    <h4>Por favor siga todos los pasos para crear su proyecto.</h4>
                </div>
                <form method="post"> 
                    <Tabs>
                        
                        <div label="Paso 1">
                            <div className="row">
                                <StepOne state={this.state} handleChange={this.handleChange} categories={this.state.categories} />
                            </div>
                        </div>
                        <div label="Paso 2">
                            <div className="row">
                                <StepTwo />
                            </div>
                        </div>
                        <div label="Paso 3">
                            <div className="row">
                                <StepThree /> 
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
