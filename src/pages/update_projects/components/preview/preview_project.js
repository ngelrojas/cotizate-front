import React from 'react'
import {Link} from 'react-router-dom'
import FooterHome from '../../../../footer/FooterComponent'
import YouTube from 'react-youtube'
import '../../css/update_project.css'
import Tabs from '../../../tabs/Tabs'
import avatar from './img/rounded.jpg'
import heart from './img/heart.svg'
import facebook from '../../../../footer/img/facebook.svg'
import twitter from '../../../../footer/img/twitter.svg'
import linkedin from '../../../../footer/img/linkedin.svg'
import instagram from '../../../../footer/img/instagram.svg'
import RewardCard from './card_rewards/rewards.js'
import API from '../../../../conf/api.js'

class PreviewProject extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: {},
      me: {},
      biography: {},
      rewards: [],
      raised: [],
    }
  }

  getReward = () => {
    let token = window.sessionStorage.getItem('token')
    let campaingId = window.localStorage.getItem('campaingId')

    API.get(`/reward/${campaingId}`, {
      headers: {
        Authorization: 'token ' + token,
      },
    })
      .then(response => {
        this.setState({rewards: response.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  currentUser = () => {
    let token = window.sessionStorage.getItem('token')

    API.get(`/user/me`, {
      headers: {Authorization: 'token ' + token},
    })
      .then(resp => {
        this.setState({me: resp.data})
      })
      .catch(e => {
        console.log(e)
      })
  }

  getPersonalDataAdd = () => {
    let token = window.sessionStorage.getItem('token')

    API.get(`/user/biography/`, {
      headers: {Authorization: 'token ' + token},
    })
      .then(resp => {
        this.setState({biography: resp.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  getCampaings = () => {
    let campaingId = this.props.match.params.campaingId
    let token = window.sessionStorage.getItem('token')

    API.get(`/campaing/${campaingId}`, {
      headers: {
        Authorization: 'token ' + token,
      },
    })
      .then(response => {
        this.setState({fields: response.data.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  getRaised = () => {
    let campaingId = window.localStorage.getItem('campaingId')
    let token = window.sessionStorage.getItem('token')
    API.get(`/raised/${campaingId}`, {
      headers: {
        Authorization: 'token ' + token,
      },
    }).then(response => {
      this.setState({raised: response.data.data})
    })
  }

  componentDidMount() {
    this.getCampaings()
    this.currentUser()
    this.getPersonalDataAdd()
    this.getReward()
    this.getRaised()
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    }
    const {rewards} = this.state
    const progressbar = {
      width: `${this.state.raised.count / 100}%`,
      backgroundColor: '#f37a22',
    }
    return (
      <div className="container-site_on">
        <div className="container">
          <div className="row preview-row">
            <div className="col-8">
              <h5 className="preview-h">{this.state.fields.title}</h5>
              <div className="preview-videos">
                <YouTube videoId={this.state.fields.video} opts={opts} />
              </div>
              <div className="row preview-spans">
                <div className="col-4">
                  {this.state.fields.category
                    ? this.state.fields.category.name
                    : ''}
                </div>
                <div className="col-4"></div>
                <div className="col-4">{this.state.fields.city}</div>
              </div>
              <div className="row preview-tabs preview-content">
                <Tabs>
                  <div label="Descripcion">
                    <div className="row">
                      <div
                        className="preview-p"
                        dangerouslySetInnerHTML={{
                          __html: this.state.fields.description,
                        }}></div>
                    </div>

                    <div className="row justify-content-center row-tags">
                      <div className="col col-12">
                        <h4 className="preview-p">TAGS</h4>
                      </div>

                      {this.state.fields.tags
                        ? this.state.fields.tags.map(tag => (
                            <h6 className="col col-3 tag-item" key={tag.id}>
                              {tag.name}
                            </h6>
                          ))
                        : ''}
                    </div>
                    <div className="btn-save d-flex justify-content-center">
                      <Link
                        to={`/project/update/${this.state.fields.id}`}
                        className="btn btn-sm btn-primary botton-save">
                        RETORNAR
                      </Link>
                    </div>
                  </div>
                  <div label="Novedades">
                    <div className="row">
                      <h5>novedades</h5>
                    </div>
                  </div>
                  <div label="Apoyadores">
                    <div className="row">
                      <h5>apoyadores</h5>
                    </div>
                  </div>
                  <div label="Comentarios">
                    <div className="row">
                      <h5>comentarios</h5>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
            <div className="col-4">
              <h5 className="h5-t">PROYECTO CREADO POR</h5>
              <div className="avatar">
                <img
                  src={avatar}
                  alt="cotizate avatar"
                  className="rounded-circle rounded-sm"
                />
                <div className="data-preview">
                  <p>{`${this.state.me.name} ${this.state.me.last_name}`} </p>
                  <p>
                    <span>sitio web: </span>
                    {this.state.fields.website}
                  </p>
                  <p>
                    <span>email: </span>
                    {this.state.me.email}
                  </p>
                </div>
              </div>
              <div className="data-preview-meta">
                <h5>
                  <span className="txt-budget">META </span>
                  {`${this.state.fields.budget} ${
                    this.state.fields.currencies
                      ? this.state.fields.currencies.symbol
                      : ''
                  }`}
                </h5>
              </div>

              <div className="data-preview-bar">
                <div className="progress">
                  <div
                    style={progressbar}
                    className="progress-ba"
                    role="progressbar"
                    aria-valuenow={this.state.raised.count}
                    aria-valuemin="0"
                    aria-valuemax="100"></div>
                </div>
              </div>

              <div className="data-preview-meta">
                <h5>
                  ALCANZADO {this.state.raised.amount}{' '}
                  {`${
                    this.state.fields.currencies
                      ? this.state.fields.currencies.symbol
                      : ''
                  }
                  `}
                </h5>
              </div>

              <div className="data-preview-apoyado">
                <p>Apoyado por 60 personas</p>
              </div>

              <div className="data-preview-followers">
                <div className="heart">
                  <span>
                    seguir{' '}
                    <img
                      className="img-heart"
                      src={heart}
                      alt="cotizate like"
                    />
                  </span>
                </div>
                <div className="heart-count">
                  <span>seguidores 5</span>
                </div>
              </div>

              <div className="data-preveiw-social-network">
                <div className="data-preview-meta d-flex justify-content-center">
                  <h5>Comparte este proyecto</h5>
                </div>
                <div className="icons-social-networks">
                  <div className="row d-flex justify-content-center">
                    <div className="col-2">
                      <img
                        src={facebook}
                        alt="cotizate facebook"
                        className="img-responsive-social-preview"
                      />
                    </div>
                    <div className="col-2">
                      <img
                        src={twitter}
                        alt="cotizate twitter"
                        className="img-responsive-social-preview"
                      />
                    </div>
                    <div className="col-2">
                      <img
                        src={linkedin}
                        alt="cotizate linkedin"
                        className="img-responsive-social-preview"
                      />
                    </div>
                    <div className="col-2">
                      <img
                        src={instagram}
                        alt="cotizate instagram"
                        className="img-responsive-social-preview"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-contributions">
                <div className="box-form col-12">
                  <div className="inline-form d-flex justify-content-center">
                    <label>
                      <span>Contribuir sin recompensa</span>
                      <input type="text" className="form-control" />
                    </label>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-warning btn-contributions btn-lg">
                      CONTRIBUIR
                    </button>
                  </div>
                </div>
                <div className="box-contributions">
                  <h5 className="box-txt d-flex justify-content-center">
                    RECOMPESAS
                  </h5>
                </div>
                {rewards
                  ? rewards.map(reward => (
                      <RewardCard key={reward.id} reward={reward} />
                    ))
                  : '<p>loading....</p>'}
              </div>
            </div>
          </div>
        </div>
        <FooterHome />
      </div>
    )
  }
}

export default PreviewProject
