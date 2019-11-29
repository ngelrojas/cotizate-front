import React, {Component} from 'react';
import FooterHome from '../../../../footer/FooterComponent'
import Tabs from '../../../explore_projects/components/Tabs';
import FormPerson from '../forms/form_person';
import FormCompany from '../forms/form_company';


class StepThree extends Component
{
    render(){
        return(
            <div className="container-site_on">
                <div className="container">
                <Tabs>
                    <div label="Persona Juridica">
                        <div className="row">   
                            <FormPerson />
                        </div>
                    </div>
                    <div label="Empresa">
                        <div className="row">
                            <FormCompany />
                        </div>
                        
                    </div>
                </Tabs>

                </div>
                <FooterHome />
            </div>
        )
    }
}

export default StepThree;