import React from 'react'
// import {Link} from 'react-router-dom'
import API from '../../../../conf/api.js'
import API_URL from '../../../../conf/apis.js'
import {TableReward} from './table-reward.js'
import {Editor} from '@tinymce/tinymce-react'
import './reward.css'

class RewardForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      errors: {},
      des_reward: '',
      msg: '',
      initial_value: '',
      rewards: [],
    }
  }

  handleEditorReward = (content, editor) => {
    this.setState({des_reward: content})
  }

  handleChange = async e => {
    e.preventDefault()
    let fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({fields})
  }

  getRewards = () => {
    let campaingId = window.localStorage.getItem('campaingId')
    let token = window.sessionStorage.getItem('token')
    fetch(API_URL + `/reward/${campaingId}`, {
      method: 'GET',
      headers: {
        Authorization: 'token ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        this.setState({rewards: response})
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSubmit = async e => {
    e.preventDefault()

    if (this.validateForm()) {
      let campaing_id = window.localStorage.getItem('_id')
      let token = window.sessionStorage.getItem('token')
      let date = this.state.fields.date
      let msg = ''

      await API.post(
        `/reward`,
        {
          campaing: campaing_id,
          title: this.state.fields.title_reward,
          price: this.state.fields.price_reward,
          type_reward: this.state.fields.type_reward,
          delivery_data: date + ' 00:00',
          delivery_place: date + ' 00:00 ',
          description: this.state.des_reward,
          currencies: this.state.fields.currencies,
        },
        {
          headers: {Authorization: 'token ' + token},
        },
      )
        .then(res => {
          this.getRewards()

          msg = 'recompensa adicionada.'
          this.setState({
            msg: msg,
            initial_value: '',
            rewards: [...this.state.rewards, ...res.data],
          })
        })
        .catch(err => {
          console.log(err)
        })

      this.clear_fields(this.state.fields)
    }
  }

  clear_fields = fields => {
    fields['title_reward'] = ''
    fields['price_reward'] = ''
    fields['currencies'] = '1'
    fields['date'] = ''
    fields['type_reward'] = '2'
  }

  validateForm() {
    let fields = this.state.fields
    let des_reward = this.state.des_reward
    let errors = {}
    let formIsValid = true

    if (!fields['title_reward']) {
      formIsValid = false
      errors['title_reward'] = 'las recomopensa deben contener un titulo.'
    }

    if (!fields['price_reward']) {
      formIsValid = false
      errors['price_reward'] = 'las recompensas deben tener un valor de precio.'
    }

    if (!fields['date']) {
      formIsValid = false
      errors['date'] = 'las recompensas deben una fecha de entrega.'
    }

    if (!fields['type_reward']) {
      formIsValid = false
      errors['type_reward'] =
        'las recompensas debe contener un tipo de recompensa.'
    }

    if (des_reward.length === 0) {
      formIsValid = false
      errors['des_reward'] = 'las recomponesas deben contener una descricion.'
    }

    this.setState({errors: errors})

    return formIsValid
  }

  handleClick = e => {
    console.log('here ', e)
  }

  componentDidMount() {
    this.getRewards()
  }

  render() {
    const {rewards} = this.state
    return (
      <div className="container-site_on">
        <div className="row form-reward">
          <form method="post" className="col-md-6" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="col-md-10">
                <span className="form-sub-title">
                  Describe cuales son las Recompensas que ofreces.
                </span>
              </label>
              <label className="col-md-10">
                <span className="form-sub-title">Titulo de recompensa</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.title_reward || ''}
                  name="title_reward"
                  onChange={this.handleChange}
                />
                <div className="MsgError">{this.state.errors.title_reward}</div>
              </label>
              <label className="col-md-6">
                <span className="form-sub-title">valor de la recompensa</span>
                <input
                  type="numeric"
                  className="form-control"
                  value={this.state.fields.price_reward || ''}
                  name="price_reward"
                  onChange={this.handleChange}
                />
                <div className="MsgError">{this.state.errors.price_reward}</div>
              </label>
              <label className="col-md-4">
                <span className="form-sub-title">Moneda</span>
                <select
                  className="form-control"
                  name="currencies"
                  onChange={this.handleChange}>
                  <option value="0">Seleccionar una Moneda</option>
                  <option value={this.state.fields.currencies || '1'}>
                    Bolivianos
                  </option>
                  <option value={this.state.fields.currencies || '2'}>
                    Dolares
                  </option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-10">
                <span className="form-sub-title">Fecha estimada</span>
                <input
                  type="date"
                  className="form-control"
                  value={this.state.fields.date || ''}
                  name="date"
                  onChange={this.handleChange}
                />
                <div className="MsgError">{this.state.errors.date}</div>
              </label>
              <label className="col-md-10">
                <span className="form-sub-title">Tipo de Recompensa</span>
                <select
                  className="form-control"
                  name="type_reward"
                  onChange={this.handleChange}>
                  <option value="0">Tipo de Recompensa</option>
                  <option value={this.state.fields.type_reward || '1'}>
                    Donacion
                  </option>
                  <option value={this.state.fields.type_reward || '2'}>
                    Contribucion
                  </option>
                </select>
                <div className="MsgError">{this.state.errors.type_reward}</div>
              </label>
            </div>

            <div className="form-group">
              <label className="col-md-10">
                <span className="form-sub-title">Descripcion</span>

                <Editor
                  initialValue={this.state.initial_value}
                  init={{
                    height: 500,
                    menubar: true,

                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor image',
                      'imagetools earchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | image | imagetools bullist numlist outdent indent | removeformat | help',
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    file_picker_callback: function(cb, value, meta) {
                      var input = document.createElement('input')
                      input.setAttribute('type', 'file')
                      input.setAttribute('accept', 'image/*')
                      input.onchange = function() {
                        var file = this.files[0]

                        var reader = new FileReader()
                        reader.onload = function() {
                          var id = 'blobid' + new Date().getTime()
                          var blobCache =
                            window.tinymce.activeEditor.editorUpload.blobCache
                          var base64 = reader.result.split(',')[1]
                          var blobInfo = blobCache.create(id, file, base64)
                          blobCache.add(blobInfo)

                          cb(blobInfo.blobUri(), {title: file.name})
                        }
                        reader.readAsDataURL(file)
                      }

                      input.click()
                    },
                  }}
                  onEditorChange={this.handleEditorReward}
                />
                <div className="MsgError">{this.state.errors.des_reward}</div>
              </label>
            </div>
            <div className="row">
              <div className="MsgSuccess">{this.state.msg}</div>
              <div className="col-6">
                <button type="submit" className="btn btn-primary">
                  CREAR RECOMPENSA
                </button>
              </div>
            </div>
          </form>

          <TableReward rewards={rewards} reward_btn={this.handleClick} />
        </div>
      </div>
    )
  }
}

export default RewardForm
