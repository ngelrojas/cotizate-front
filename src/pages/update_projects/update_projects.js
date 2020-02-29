import React, {Component} from 'react'
import API from '../../conf/api.js'
import {Link} from 'react-router-dom'
import {MdClear, MdCreate} from 'react-icons/md'
import FooterHome from '../../footer/FooterComponent'
import './css/update_project.css'

class UpdateProject extends Component {
  constructor() {
    super()
    this.state = {
      campaings: [],
    }
  }

  getCampaings = () => {
    window.localStorage.removeItem('campaingId')
    let token = window.sessionStorage.getItem('token')
    API.get(`/campaing`, {
      headers: {Authorization: 'token ' + token},
    })
      .then(resp => {
        this.setState({campaings: resp.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getCampaings()
  }

  render() {
    const {campaings} = this.state
    return (
      <div className="container-site_on">
        <div className="container">
          <div className="row">
            <div className="update-project col-12">
              <h5>MIS PROYECTOS</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>TITULO</th>
                    <th>CIUDAD</th>
                    <th>ACUMULAR</th>
                    <th>MONEDA</th>
                    <th>DIAS</th>
                    <th>CATEGORIAS</th>
                    <th colSpan="2"></th>
                  </tr>
                </thead>
                <tbody>
                  {campaings &&
                    campaings.map(campaing => (
                      <tr key={campaing.id}>
                        <td>{campaing.title}</td>
                        <td>{campaing.city}</td>
                        <td>{campaing.budget}</td>
                        <td>{campaing.currencies.name}</td>
                        <td>{campaing.qty_days}</td>
                        <td>{campaing.category.name}</td>
                        <td colSpan="2">
                          <Link
                            className="btn"
                            to={`/project/update/${campaing.id}`}>
                            <MdCreate />
                          </Link>
                          <Link
                            className="btn"
                            to={`/project/delete/${campaing.id}`}>
                            <MdClear />
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <FooterHome />
      </div>
    )
  }
}

export default UpdateProject
