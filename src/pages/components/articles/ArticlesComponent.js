import React from 'react'
import {Link} from 'react-router-dom'
import YouTube from 'react-youtube'
import API from '../../../conf/api.js'
import './css/articles.css'
import marker from './img/gps.svg'

class ArticleComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      raised: {},
    }
  }

  getRaised = () => {
    API.get(`/raised-public/${this.props.id}`)
      .then(response => {
        this.setState({raised: response.data.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getRaised()
  }

  render() {
    const {raised} = this.state
    const opts = {
      height: '233',
      width: '350',
      playerVars: {
        autoplay: 0,
      },
    }
    const progressbar = {
      width: raised.count ? `${raised.count / 100}%` : '0%',
      backgroundColor: '#f37a22',
    }
    return (
      <div className="col col-4 card-article">
        <YouTube videoId={this.props.video} opts={opts} />
        <div className="card-body">
          <div className="art-title">
            <p>
              <Link to={`/proyecto/${this.props.slug}`}>
                {this.props.title}
              </Link>
            </p>
          </div>
          <div className="art-author">
            <p>
              Por: <Link to="#">{this.props.author}</Link>
            </p>
          </div>
          <p className="card-text">
            <Link to={`/proyecto/${this.props.slug}`}>
              <div dangerouslySetInnerHTML={{__html: this.props.excerpt}}></div>
            </Link>
          </p>

          <div className="card-category">
            <p className="name-category">
              <Link to={`/categoria/${this.props.category.slug}`}>
                {this.props.category.name}
              </Link>
            </p>
          </div>
          <div className="card-coin-percent">
            <div className="coin">
              <span>
                {this.props.currencies.symbol}:{' '}
                {raised.amount ? raised.amount : '0'}
              </span>
            </div>
            <div className="percent">
              <span>{raised.count ? `${raised.count / 100}%` : '0'}</span>
            </div>
          </div>
          <div className="progress">
            <div
              style={progressbar}
              className="progress-ba"
              role="progressbar"
              aria-valuenow={raised.count ? `${raised.count / 100}` : '0'}
              aria-valuemin="0"
              aria-valuemax="100"></div>
          </div>
          <div className="art-footer">
            <p>
              <span className="art-marquer">
                <img
                  src={marker}
                  className="img-responsive-cotizate"
                  alt="cotizate"
                />
              </span>
              <span className="art-name-city">{this.props.city}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleComponent
