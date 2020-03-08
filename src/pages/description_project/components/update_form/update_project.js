import React from 'react'
import {Link} from 'react-router-dom'
import FooterHome from '../../../../footer/FooterComponent'
import Tabs from '../../../tabs/Tabs.js'
import BasicForm from './basic.js'
import HistoryForm from './history.js'
import RewardForm from './reward.js'
import './update_project.css'

class UpdateProjectForm extends React.Component {
  constructor() {
    super()
    this.state = {
      campaing: [],
      campaing_id: '',
    }
  }

  getToken = () => {
    let token = window.sessionStorage.getItem('token')
    return token
  }

  componentDidMount() {
    let campaingId = this.props.match.params.campaingId
    this.setState({campaing_id: campaingId})
    window.localStorage.setItem('campaingId', campaingId)
  }

  render() {
    return (
      <div className="container-site_on">
        <div className="title-steps">
          <h4>Por favor verifique que todos sus datos sean correctos.</h4>
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

          <div label="Pre-Visualizacion">
            <div className="row">
              <div className="col-12">
                <p>
                  <Link
                    className="link-profile btn btn-small btn-outline-dark"
                    to={`/project/preview/${this.state.campaing_id}`}>
                    Pre Visualizar proyecto
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
