import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


class BreadCrumbs extends Component
{
    render(){
        return(
            <section className="container header-under-slider">
                    
                <div className="row">
                    <div className="col col-6"><h5>{this.props.titleB}</h5></div>
                    <div className="col col-6 link-see-more"><NavLink to="/">{this.props.linkB}</NavLink></div>
                </div>
                
            </section>
        )
    }
}
export default BreadCrumbs;