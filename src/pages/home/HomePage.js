import React from 'react'
import API from '../../conf/api.js'
import Slider from './slider/SliserComponent'
import Articles from '../components/articles/ArticlesComponent'
import BreadCrumbs from './breadcrumbs/BreadCrumbs'
import SliderCarousel from './slider/SliderCarousel'
import FooterHome from '../../footer/FooterComponent'
import bannerhome from './img/cotizate-tech.png'
import './css/home.css'

const categoryjson = [
  {id: 1, img: 'http://www.fillmurray.com/200/200', url_link: 'ciencias'},
  {id: 2, img: 'http://www.fillmurray.com/200/200', url_link: 'psicologia'},
  {id: 3, img: 'http://www.fillmurray.com/200/200', url_link: 'art'},
  {id: 4, img: 'http://www.fillmurray.com/200/200', url_link: 'music'},
  {id: 5, img: 'http://www.fillmurray.com/200/200', url_link: 'deportes'},
  {id: 6, img: 'http://www.fillmurray.com/200/200', url_link: 'tecnologia'},
  {id: 7, img: 'http://www.fillmurray.com/200/200', url_link: 'other'},
  {id: 8, img: 'http://www.fillmurray.com/200/200', url_link: 'moremore'},
]

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      titleBread_1: 'PROYECTOS DESTACADOS',
      titleBread_2: 'CAUSAS SOCIALES',
      titleBread_3: 'PROYECTOS FINALIZADOS',
      titleBread_4: 'CATEGORIAS',
      titleBread_5: 'NUESTROS PATROCINADORES',
      linkBread_1: 'ver mas',
      articles: [],
      categories: [],
    }
  }

  getCampaings = () => {
    API.get(`/campaings`)
      .then(response => {
        this.setState({articles: response.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  getCategories = () => {
    API.get(`/category-list`)
      .then(response => {
        this.setState({categories: response.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    window.localStorage.removeItem('campaingId')
    window.localStorage.removeItem('basic')
    this.getCampaings()
    this.getCategories()
  }
  render() {
    const {articles} = this.state
    return (
      <div className="container-site_on">
        <section className="container-slider">
          <Slider />
        </section>

        <BreadCrumbs
          titleB={this.state.titleBread_1}
          linkB={this.state.linkBread_1}
        />

        <section className="container">
          <div className="row">
            {articles &&
              articles.map(art => (
                <Articles
                  key={art.id}
                  id={art.id}
                  video={art.video}
                  title={art.title}
                  excerpt={art.excerpt}
                  author={`${art.user.name} ${art.user.last_name}`}
                  slug={art.slug}
                  category={art.category}
                  currencies={art.currencies}
                  city={art.city}
                />
              ))}
          </div>
        </section>

        <div className="container-slider">
          <div className="container-slider-2">
            <img src={bannerhome} className="d-block w-100" alt="cotizate" />
          </div>
        </div>

        <BreadCrumbs
          titleB={this.state.titleBread_2}
          linkB={this.state.linkBread_1}
        />

        <section className="container">
          <div className="row">
            {articles &&
              articles.map(art => (
                <Articles
                  key={art.id}
                  id={art.id}
                  video={art.video}
                  title={art.title}
                  excerpt={art.excerpt}
                  author={`${art.user.name} ${art.user.last_name}`}
                  slug={art.slug}
                  category={art.category}
                  currencies={art.currencies}
                  city={art.city}
                />
              ))}
          </div>
        </section>

        <div className="container">
          <div className="slider-categories">
            <SliderCarousel
              titleB={this.state.titleBread_4}
              catjson={this.state.categories}
            />
          </div>
        </div>

        <BreadCrumbs
          titleB={this.state.titleBread_3}
          linkB={this.state.linkBread_1}
        />

        <section className="container">
          <div className="row">
            {articles &&
              articles.map(art => (
                <Articles
                  key={art.id}
                  id={art.id}
                  video={art.video}
                  title={art.title}
                  excerpt={art.excerpt}
                  author={`${art.user.name} ${art.user.last_name}`}
                  slug={art.slug}
                  category={art.category}
                  currencies={art.currencies}
                  city={art.city}
                />
              ))}
          </div>
        </section>

        <div className="container">
          <div className="slider-categories">
            <SliderCarousel
              titleB={this.state.titleBread_5}
              catjson={categoryjson}
            />
          </div>
        </div>

        <FooterHome />
      </div>
    )
  }
}

export default HomePage
