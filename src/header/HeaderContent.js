import React, { Component } from 'react';
import './css/header.css';
import NavBar from './components/NavBarComponent';
import SearchBox from './components/SearchComponent';


class HeaderContent extends Component{
    render(){
        return(
            <nav className="menum navbar navbar-light navbar-expand-md justify-content-center fixed-top_">
                
                <SearchBox />

                <NavBar />

            </nav>
        )
    }
} 

export default HeaderContent;