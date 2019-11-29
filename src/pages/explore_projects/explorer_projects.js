import React, { Component} from 'react';
import axios from 'axios';
import FooterHome from '../../footer/FooterComponent';
import bannerhome from '../../pages/home/img/cotizate-tech.png';
import Tabs from './components/Tabs';
import './css/explorer_projects.css';
import Articles from '../components/articles/ArticlesComponent';


const datajson = [
    {id:1, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Ciencia", usd_qty:"100.00", percent:"60", country:"Bolivia", city:"Santa Cruz de la Sierra", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
    {id:2, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Tecnologia", usd_qty:"90.00", percent:"50", country:"Bolivia", city:"Cochabamba", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
    {id:3, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Educacion", usd_qty:"40.00", percent:"40", country:"Bolivia", city:"La Paz", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
    {id:4, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Arte", usd_qty:"700.00", percent:"70", country:"Bolivia", city:"Oruro", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
    {id:5, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Musica", usd_qty:"900.00", percent:"90", country:"Bolivia", city:"Tarija", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
]


class ExplorerProject extends Component
{
    state = {
        key: 'home',
        articles: []
    };
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users').then( arts =>{
            
            const articles = arts.data;
            this.setState({articles})
        })
    }
    render(){
        let listArt = datajson;

        if(this.state.articles.length > 0){
            
            console.log(this.state.articles);
        }
        
        if( listArt.length > 0){
            // this.state.articles.map() replace with datajson.map
            listArt = datajson.map( function(art) {
                
                return(
                    <Articles key={art.id} id_art={art.id} img_art={art.img} title_art={art.title} excerpt_art={art.excerpt} author_art={art.author} date_art={art.date} slug_art={art.slug} category_art={art.category} usd_qty={art.usd_qty} percent_art={art.percent} country_art={art.country} city_art={art.city} slug_category_art={art.slug_category} slug_author_art={art.slug_author} />
                )
            })

        }else{
            listArt = "<h3>Articles not found...!</h3>";
        }
        return(
            <div className="container-site_on">
                <div className="container-slider">
                    <div className="container-slider-2">
                        <img src={bannerhome} className="d-block w-100" alt="cotizate"/>
                    </div>
                </div>
                <Tabs>
                    <div label="Todos los Proyectos">
                        <div className="row">   
                            {listArt}
                        </div>
                    </div>
                    <div label="Proyectos Destacados">
                        
                        <div className="row">
                            
                        </div>
                        
                    </div>
                    <div label="Proyectos Finalizados">
                        <div className="row">
                            {listArt}
                        </div>
                    </div>
                    <div label="Causas Sociales">
                        <div className="row">
                            
                        </div>
                    </div>
                </Tabs>
                
                <FooterHome />
            </div>
            
        )
    }
}

export default ExplorerProject;