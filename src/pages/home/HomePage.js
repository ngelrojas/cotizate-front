import React, { Component} from 'react';
import axios from 'axios';
import Slider from './slider/SliserComponent';
import Articles from '../components/articles/ArticlesComponent';
import BreadCrumbs from './breadcrumbs/BreadCrumbs';
import SliderCarousel from './slider/SliderCarousel';
import FooterHome from '../../footer/FooterComponent';
import bannerhome from './img/cotizate-tech.png';
import './css/home.css';

const datajson = [
    {id:1, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Ciencia", usd_qty:"100.00", percent:"60", country:"Bolivia", city:"Santa Cruz de la Sierra", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
    {id:2, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Tecnologia", usd_qty:"90.00", percent:"50", country:"Bolivia", city:"Cochabamba", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
    {id:3, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Educacion", usd_qty:"40.00", percent:"40", country:"Bolivia", city:"La Paz", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
    {id:4, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Arte", usd_qty:"700.00", percent:"70", country:"Bolivia", city:"Oruro", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
    {id:5, title:"Innovacion y desarrollo tecnologico/epo175", img:"https://picsum.photos/300/200/?gravity=east", author:"RedNodes Company", slug_author:"rednodes-company", date:"sep 10 2019", excerpt:"Some quick example text to build on the card title and make up the bulk of the card's content.", category:"Musica", usd_qty:"900.00", percent:"90", country:"Bolivia", city:"Tarija", slug:"Innovacion-y-desarrollo-tecnologico-epo175", slug_category:"ciencia"},
]

const categoryjson = [
    {id:1, img:"http://www.fillmurray.com/200/200", url_link:"ciencias"},
    {id:2, img:"http://www.fillmurray.com/200/200", url_link:"psicologia"},
    {id:3, img:"http://www.fillmurray.com/200/200", url_link:"art"},
    {id:4, img:"http://www.fillmurray.com/200/200", url_link:"music"},
    {id:5, img:"http://www.fillmurray.com/200/200", url_link:"deportes"},
    {id:6, img:"http://www.fillmurray.com/200/200", url_link:"tecnologia"},
    {id:7, img:"http://www.fillmurray.com/200/200", url_link:"other"},
    {id:8, img:"http://www.fillmurray.com/200/200", url_link:"moremore"},
]


class HomePage extends Component{
    state = {
        titleBread_1: 'PROYECTOS DESTACADOS',
        titleBread_2: 'CAUSAS SOCIALES',
        titleBread_3: 'PROYECTOS FINALIZADOS',
        titleBread_4: 'CATEGORIAS',
        titleBread_5: 'NUESTROS PATROCINADORES',
        linkBread_1: 'ver mas',
        articles: [],
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users').then( arts =>{
            
            const articles = arts.data;
            this.setState({articles})
        })
    }
    render(){
        let listArt = datajson;

        if(this.state.articles.length > 0){
            
            //console.log(this.state.articles);
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
                <section className="container-slider">
                    <Slider />
                </section>

                <BreadCrumbs titleB={this.state.titleBread_1} linkB={this.state.linkBread_1} />

                <section className="container">
                    <div className="row">
                        {listArt}
                    </div>
                </section>

                <div className="container-slider">
                    <div className="container-slider-2">
                        <img src={bannerhome} className="d-block w-100" alt="cotizate"/>
                    </div>
                </div>

                <BreadCrumbs titleB={this.state.titleBread_2} linkB={this.state.linkBread_1} />
                
                <section className="container">
                    <div className="row">
                        {listArt}
                    </div>
                </section>

                <div className="container">
                    <div className="slider-categories">
                        <SliderCarousel titleB={this.state.titleBread_4} catjson={categoryjson} />
                    </div>
                </div>

                <BreadCrumbs titleB={this.state.titleBread_3} linkB={this.state.linkBread_1} />
                
                <section className="container">
                    <div className="row">
                        {listArt}
                    </div>
                </section>

                <div className="container">
                    <div className="slider-categories">
                        <SliderCarousel titleB={this.state.titleBread_5} catjson={categoryjson} />
                    </div>
                </div>

                <FooterHome />

            </div>
        )
    }
}

export default HomePage;
