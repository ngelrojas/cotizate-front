import React from 'react';
import Tabs from '../../../tabs/Tabs.js';
import FormPerson from '../forms/form_person';
import FormCompany from '../forms/form_company';


class StepThree extends React.Component
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
            </div>
        )
    }
}

export default StepThree;
