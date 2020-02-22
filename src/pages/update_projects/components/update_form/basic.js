import React from 'react'
import API_URL from '../../../../conf/apis.js'
// import API from '../../../../conf/api.js'

class BasicForm extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: {},
      errors: {},
      msg: '',
      categories: [],
      campaing: {},
    }
  }

  handleChange = e => {
    e.preventDefault()
    let fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({fields})
  }

  async getCategories() {
    const response = await fetch(API_URL + `/category/public/general`)
    const data = await response.json()
    this.setState({categories: data})
  }

  getCampaings = () => {
    let campaingId = window.localStorage.getItem('campaingId')
    let token = window.sessionStorage.getItem('token')
    fetch(API_URL + `/campaing/${campaingId}`, {
      method: 'GET',
      headers: {
        Authorization: 'token ' + token,
      },
    })
      .then(resp => resp.json())
      .then(response => {
        this.setState({fields: response.data})
      })
  }

  handleSubmit = e => {
    e.preventDefault()

    let msg = ''

    if (this.validateForm()) {
      let campaingId = window.localStorage.getItem('campaingId')
      let token = window.sessionStorage.getItem('token')
      console.log(this.state.fields.category)
      /*fetch(API_URL + `/campaing`, {*/
      //method: 'PUT',
      //headers: {
      //Authorization: 'token ' + token,
      //'Content-Type': 'application/json',
      //},
      //body: JSON.stringify({
      //id: campaingId,
      //title: this.state.fields.title,
      //city: this.state.fields.city,
      //category: this.state.fields.category.id,
      //budget: this.state.fields.budget,
      //currencies: this.state.fields.currencies.id,
      //qty_days: this.state.fields.qty_days,
      //facebook: this.state.fields.facebook,
      //instagram: this.state.fields.instagram,
      //linkedin: this.state.fields.linkedin,
      //twitter: this.state.fields.twitter,
      //website: this.state.fields.website,
      //}),
      //})
      //.then(resp => resp.json())
      //.then(response => {
      //console.log(response)
      //})
      /*.catch(err => console.log(err))*/
    }
  }

  validateForm() {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true

    if (!fields['title']) {
      formIsValid = false
      errors['title'] = 'Tu proyecto debe contener un titulo.'
    }

    if (!fields['city']) {
      formIsValid = false
      errors['city'] = 'Tu proyecto debe tener una ciudad.'
    }

    if (!fields['category']) {
      formIsValid = false
      errors['category'] = 'Tu proyecto debe pertenecer a una categoria.'
    }

    if (!fields['budget']) {
      formIsValid = false
      errors['budget'] = 'Tu proyecto debe tener una cantidad de dinero.'
    }

    if (!fields['currencies']) {
      formIsValid = false
      errors['currencies'] = 'Tu proyecto debe contener una moneda.'
    }

    if (!fields['qty_days']) {
      formIsValid = false
      errors['qty_days'] = 'Tu proyecto debe contener una cantidad de dias.'
    }

    this.setState({
      errors: errors,
    })

    return formIsValid
  }

  componentDidMount() {
    this.getCampaings()
    this.getCategories()
  }

  render() {
    const {categories} = this.state

    return (
      <div className="container-site_on">
        <form method="post" onSubmit={this.handleSubmit}>
          <div className="container form-step-one">
            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">
                  Cual es el Titulo del Proyecto ?
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.title || ''}
                  name="title"
                  onChange={this.handleChange}
                />
              </label>
              <div className="errorsMsg">{this.state.errors.title}</div>
            </div>

            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">
                  De donde es tu proyecto ?
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.city || ''}
                  name="city"
                  onChange={this.handleChange}
                />
              </label>
              <div className="errorsMsg">{this.state.errors.city}</div>
            </div>

            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">
                  Cual es la Categoria de tu proyecto ?
                </span>
                <select
                  className="form-control"
                  value={this.state.fields.category || ''}
                  name="category"
                  onChange={this.handleChange}>
                  {categories &&
                    categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </label>
              <div className="errorsMsg">{this.state.errors.category}</div>
            </div>
            <div className="form-group">
              <label className="col-md-6">
                <span className="form-sub-title">
                  Cuanto dinero necesitas para tu proyecto ?
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.budget || ''}
                  name="budget"
                  onChange={this.handleChange}
                />
              </label>
              <label className="col-md-2">
                <span className="form-sub-title">Moneda:</span>
                <select
                  className="form-control"
                  name="currencies"
                  value={this.state.fields.currencies || ''}
                  onChange={this.handleChange}>
                  {this.state.fields.currencies ? (
                    <option value={this.state.fields.currencies.id}>
                      {this.state.fields.currencies.name}
                    </option>
                  ) : (
                    'no data'
                  )}
                  <option value="1">Bolivianos</option>
                  <option value="2">Dolares</option>
                </select>
                <div className="errorsMsg">{this.state.errors.currencies}</div>
              </label>
              <div className="errorsMsg">{this.state.errors.budget}</div>
            </div>

            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">
                  Cuantos dias será la duracion de la campaña ?
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.qty_days || ''}
                  name="qty_days"
                  onChange={this.handleChange}
                />
              </label>
              <div className="errorsMsg">{this.state.errors.qty_days}</div>
            </div>

            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">
                  Adicione sus redes sociales (opcional), si no tiene redes
                  sociales adicione 'no', o en aquelas que no tuviese.
                </span>
              </label>
              <label className="col-md-8">
                <span className="form-sub-title">facebook</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.facebook || ''}
                  name="facebook"
                  onChange={this.handleChange}
                />
              </label>
              <label className="col-md-8">
                <span className="form-sub-title">instagram</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.instagram || ''}
                  name="instagram"
                  onChange={this.handleChange}
                />
              </label>
              <label className="col-md-8">
                <span className="form-sub-title">linkedIn</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.linkedin || ''}
                  name="linkedin"
                  onChange={this.handleChange}
                />
              </label>
              <label className="col-md-8">
                <span className="form-sub-title">twitter</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.twitter || ''}
                  name="twitter"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">Website</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.website || ''}
                  name="website"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="container">
            <div className="col col-md-8">
              <div className="successMsg">{this.state.msg}</div>
            </div>
          </div>
          <div className="container">
            <div className="col col-md-8">
              <button type="submit" className="btn btn-primary">
                ACTUALIZAR
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default BasicForm
