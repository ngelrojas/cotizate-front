import React from 'react'
import {Link} from 'react-router-dom'
import FooterHome from '../../../../footer/FooterComponent'
import Tabs from '../../../tabs/Tabs.js'
import BasicForm from './basic.js'
import HistoryForm from './history.js'
import RewardForm from './reward.js'
import {Accordion, AccordionItem} from 'react-sanfona'
import './create_project.css'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class CreateProjectForm extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: {},
    }
  }

  getToken = () => {
    let token = window.sessionStorage.getItem('token')
    return token
  }

  componentDidMount() {
    let token = this.getToken()
    if (token === null) {
      window.location = '/'
    }
  }

  render() {
    return (
      <div className="container-site_on">
        <div className="title-steps">
          <h4>Por favor siga todos los pasos para crear su proyecto.</h4>
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
              <Accordion className="col col-12">
                <AccordionItem
                  className="item-profile"
                  title="ACTUALIZAR PERFIL">
                  <div className="col col-12">
                    <p className="txt-profile">
                      por favor debe actualizar su {'  '}
                      <Link className="txt-link-profile" to="/profile/me">
                        perfil
                      </Link>
                    </p>
                  </div>
                </AccordionItem>
                <AccordionItem
                  className="item-profile"
                  title="LISTA DE PROYECTOS">
                  <div className="col col-12">
                    <p className="txt-profile">
                      <Link className="txt-link-profile" to="/update-projects">
                        ir a mis proyectos
                      </Link>
                    </p>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </Tabs>

        <FooterHome />
      </div>
    )
  }
}

export default CreateProjectForm
