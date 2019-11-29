import React, {Component} from 'react';
import svgSearch from '../img/search.svg';

class SearchComponent extends Component
{
    render(){
        return(
            <div className="container">
                    
                <div className="col col-12">
                    <form className="cotizate-on_form">
                        
                        <input type="text" className="form-control search-query" />
                        <button type="submit" className="btn btn-submit"><img src={svgSearch} className="cotizate-on_search" alt="cotizate searching"/></button>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchComponent;