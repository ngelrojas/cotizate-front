import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './css/articles.css';
import marker from './img/gps.svg';


class ArticleComponent extends Component
{
    render(){
        return(
            <div className="col col-4 card-article">
                <NavLink to={this.props.slug_art}>
                    <img className="card-img-top img-responsive" src={this.props.img_art} alt="Cotizate" />
                </NavLink>
                
                
                <div className="card-body">
                    <div className="art-title">
                        <p>
                            <NavLink to={this.props.slug_art}>
                                {this.props.title_art}
                            </NavLink>
                        </p> 
                    </div>
                    <div className="art-author">
                        <p>Por: <NavLink to={this.props.slug_author_art}>{this.props.author_art}</NavLink> </p>
                    </div>
                    <p className="card-text">
                        <NavLink to={this.props.slug_art}>
                            {this.props.excerpt_art}
                        </NavLink>
                    </p>
                    
                    <div className="card-category">
                        <p className="name-category">
                            <NavLink to={this.props.slug_category_art}>
                                {this.props.category_art}
                            </NavLink> 
                        </p>
                    </div>
                    <div className="card-coin-percent">
                        <div className="coin"><span>$USD: {this.props.usd_qty}</span></div>
                        <div className="percent"><span>{this.props.percent_art}%</span></div>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="art-footer">
                        <p>
                            <span className="art-marquer">
                                <img src={marker} className="img-responsive-cotizate" alt="cotizate"/>
                            </span>
                            <span className="art-name-city">{this.props.country_art} - {this.props.city_art}</span>
                        </p>

                    </div>
                </div>
            </div>
        )
    }
}

export default ArticleComponent;