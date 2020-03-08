import React from 'react'
import {Link} from 'react-router-dom'
import FooterHome from '../../../../footer/FooterComponent'
import YouTube from 'react-youtube'
import '../../css/description_project.css'
import Tabs from '../../../tabs/Tabs'
import avatar from './img/rounded.jpg'
import heart from './img/heart.svg'
import facebook from '../../../../footer/img/facebook.svg'
import twitter from '../../../../footer/img/twitter.svg'
import linkedin from '../../../../footer/img/linkedin.svg'
import instagram from '../../../../footer/img/instagram.svg'
import RewardCard from './card_rewards/rewards.js'
import BtnStripe from '../../../../pages/components/btnstripe/BtnStripe.Component'
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
      campaing_id: 0,
      fields_pay: {},
    }
  }

  handleChange = e => {
    e.preventDefault()
    let fields_pay = this.state.fields_pay
    fields_pay[e.target.name] = e.target.value
    this.setState({
      fields_pay,
    })
  }

  getReward = campaingId => {
    API.get(`/rewards/${campaingId}`)
      .then(response => {
        this.setState({rewards: response.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  getCampaings = () => {
    let campaing_slug = this.props.match.params.slug

    API.get(`/campaings/${campaing_slug}`)
      .then(response => {
        console.log(response.data.data)
        this.setState({
          fields: response.data.data,
        })
        this.getRaised(response.data.data.id)
        this.getReward(response.data.data.id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getRaised = campaingId => {
    API.get(`/raised-public/${campaingId}`)
      .then(response => {
        console.log(response.data.data)
        this.setState({raised: response.data.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getCampaings()
    this.getReward()
    this.getRaised()
  }

  render() {
    const opts = {
      height: '390',
      width: '698',
      playerVars: {
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
            <div className="col-8 preview-left__content">
              <h5 className="preview-h">{this.state.fields.title}</h5>
              <div className="preview-videos">
                <YouTube videoId={this.state.fields.video} opts={opts} />
              </div>
              <div className="row preview-spans">
                <div className="col-4">
                  {this.state.fields.category ? (
                    <Link to={`/categoria/${this.state.fields.category.slug}`}>
                      {this.state.fields.category.name}
                    </Link>
                  ) : (
                    ''
                  )}
                </div>
                <div className="col-4"></div>
                <div className="col-4 preview-left__city">
                  {this.state.fields.city}
                </div>
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
                        <h6 className="preview-p">TAGS</h6>
                      </div>

                      {this.state.fields.tags
                        ? this.state.fields.tags.map(tag => (
                            <h6 className="col col-3 tag-item" key={tag.id}>
                              {tag.name}
                            </h6>
                          ))
                        : ''}
                    </div>
                  </div>
                  <div label="Novedades">
                    <div className="row">
                      <div className="preview-p">
                        <h5>novedades</h5>
                      </div>
                    </div>
                  </div>
                  <div label="Seguidores">
                    <div className="row">
                      <div className="preview-p">
                        <h5>seguidores</h5>
                      </div>
                    </div>
                  </div>
                  <div label="Comentarios">
                    <div className="row">
                      <div className="preview-h">
                        <h5>comentarios</h5>
                      </div>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
            <div className="col-4 preview-right__content">
              <h5 className="h5-t">PROYECTO CREADO POR</h5>
              <div className="avatar">
                <img
                  src={avatar}
                  alt="cotizate avatar"
                  className="rounded-circle rounded-sm"
                />
                <div className="data-preview">
                  <p>
                    {this.state.fields.user
                      ? `${this.state.fields.user.name} ${this.state.fields.user.last_name}`
                      : ''}{' '}
                  </p>
                  <p>
                    <span>sitio web: </span>
                    {this.state.fields.website}
                  </p>
                  <p>
                    <span>email: </span>
                    {this.state.fields.user
                      ? `${this.state.fields.user.email}`
                      : ''}
                  </p>
                </div>
              </div>
              <div className="row data-preview-meta">
                <div className="col-6 data-preview-meta__txt">META </div>
                <div className="col-6 data-preview-meta__price">
                  {`${this.state.fields.budget} ${
                    this.state.fields.currencies
                      ? this.state.fields.currencies.symbol
                      : ''
                  }`}
                </div>
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

              <div className="row data-preview-meta">
                <div className="col-6 data-preview-meta__txt">ALCANZADO</div>
                <div className="col-6 data-preview-meta__price">
                  {this.state.raised.amount}{' '}
                  {`${
                    this.state.fields.currencies
                      ? this.state.fields.currencies.symbol
                      : ''
                  }
                  `}
                </div>
              </div>
              <div className="row">
                <div className="col-6 data-preview-followers">
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
                <div className="col-6 data-preview-apoyado">
                  <p>Apoyado por 60 personas</p>
                </div>
              </div>

              <div className="data-preveiw-social-network">
                <div className="data-preview-meta__share d-flex justify-content-center">
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
                        className="img-responsive-social-preview instagram"
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="cantidad"
                        name="contribuir"
                        value={this.state.fields_pay.contribuir || ''}
                        onChange={this.handleChange}
                      />
                    </label>
                  </div>
                  <div className="d-flex justify-content-center">
                    <BtnStripe
                      symbol={
                        this.state.fields.currencies
                          ? this.state.fields.currencies.symbol
                          : '$USD'
                      }
                      price={
                        this.state.fields_pay.contribuir
                          ? this.state.fields_pay.contribuir
                          : 0
                      }
                      campaingid={this.state.fields.id}
                    />
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
