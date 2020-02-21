import React from 'react'
import {Link} from 'react-router-dom'
import FooterHome from '../../../../footer/FooterComponent'
import Tabs from '../../../tabs/Tabs.js'
import BasicForm from './basic.js'
import HistoryForm from './history.js'
import RewardForm from './reward.js'
import API_URL from '../../../../conf/apis.js'

class UpdateProjectForm extends React.Component {
  constructor() {
    super()
    this.state = {
      campaing: {},
    }
  }

  getToken = () => {
    let token = window.sessionStorage.getItem('token')
    return token
  }

  async getCampaings() {
    const campaingId = this.props.match.params.campaingId
    const token = window.localStorage.getItem('token')
    const data = await fetch(API_URL + `campaing/${campaingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'token ' + token,
      },
    })
    const campaing = data.json()
    console.log(campaing)
    this.setState({campaing: campaing})
  }

  componentDidMount() {
    let token = this.getToken()
    this.getCampaings()
    if (token === null) {
      window.location = '/'
    }
  }

  render() {
    return (
      <div className="container-site_on">
        <div className="title-steps">
          <h4>Estas Actualizando {this.state.campaing.title}.</h4>
        </div>

        <Tabs>
          <div label="Basico">
            <div className="row">
              <BasicForm />
            </div>
          </div>

          <div label="Historia">
            <div className="row">
              <HistoryForm />
            </div>
          </div>

          <div label="Recompensas">
            <div className="row">
              <RewardForm />
            </div>
          </div>

          <div label="Mi Perfil">
            <div className="row">
              <div className="col-12">
                <p>
                  Para poder concluir con la etapa de publicacion del proyecto
                </p>
              </div>
              <div className="col-12">
                <p>
                  por favor debe actualizar su {'  '}
                  <Link className="link-profile" to="/profile/me">
                    perfil
                  </Link>
                </p>
              </div>
              <div className="col-12">
                <p>
                  <Link className="link-profile" to="#">
                    ir a mis proyectos
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Tabs>

        <FooterHome />
      </div>
    )
  }
}

export default UpdateProjectForm
