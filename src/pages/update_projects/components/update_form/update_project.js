import React from 'react'
import {Link} from 'react-router-dom'
import FooterHome from '../../../../footer/FooterComponent'
import Tabs from '../../../tabs/Tabs.js'
import BasicForm from './basic.js'
import HistoryForm from './history.js'
import RewardForm from './reward.js'
import API_URL from '../../../../conf/apis.js'
import './update_project.css'

class UpdateProjectForm extends React.Component {
  constructor() {
    super()
    this.state = {
      campaing: [],
    }
  }

  getToken = () => {
    let token = window.sessionStorage.getItem('token')
    return token
  }

  async getCampaings() {
    let campaingId = this.props.match.params.campaingId
    window.localStorage.setItem('campaingId', campaingId)
    let token = window.sessionStorage.getItem('token')
    await fetch(API_URL + `/campaing/${campaingId}`, {
      method: 'GET',
      headers: {
        Authorization: 'token ' + token,
      },
    })
      .then(resp => resp.json())
      .then(response => {
        this.setState({campaing: response.data})
        window.localStorage.setItem('campaing', JSON.stringify(response.data))
      })
  }

  componentDidMount() {
    this.getCampaings()
  }

  render() {
    const {campaing} = this.state
    return (
      <div className="container-site_on">
        <div className="title-steps">
          <h4>
            Estas Actualizando{' '}
            <span className="title-steps__title">{campaing.title}</span>.
          </h4>
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
