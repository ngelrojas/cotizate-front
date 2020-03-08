import React from 'react'
// import {Link} from 'react-router-dom'
import API from '../../../../conf/api.js'
import API_URL from '../../../../conf/apis.js'
import {TableReward} from './table-reward.js'
import {Editor} from '@tinymce/tinymce-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
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
      startDate: '',
      visible: false,
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

  handleDate = date => {
    this.setState({
      startDate: date,
    })
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
      let campaing_id = window.localStorage.getItem('campaingId')
      let token = window.sessionStorage.getItem('token')
      let date = this.state.startDate
        ? this.state.startDate
        : this.state.fields.delivery_data
      let msg = ''
      await API.put(
        `/reward`,
        {
          reward_id: this.state.fields.id,
          campaing: campaing_id,
          title: this.state.fields.title,
          price: this.state.fields.price,
          type_reward: this.state.fields.type_reward,
          delivery_data: date,
          delivery_place: date,
          description: this.state.des_reward,
          currencies: this.state.fields.currencies,
        },
        {
          headers: {Authorization: 'token ' + token},
        },
      )
        .then(res => {
          this.getRewards()
          msg = 'recompensa actualizada.'
          this.setState({
            msg: msg,
            visible: true,
          })
        })
        .catch(err => {
          let error = 'debe seleccionar una recompensa, para actualizar.'
          this.setState({msg: error})
          console.log(err)
        })

      this.clear_fields(this.state.fields)
    }
  }

  clear_fields = fields => {
    fields['title'] = ''
    fields['price'] = ''
    fields['currencies'] = '0'
    fields['date'] = ''
    fields['type_reward'] = '0'
  }

  validateForm() {
    let fields = this.state.fields
    let des_reward = this.state.des_reward
    // let date = this.state.startDate
    let errors = {}
    let formIsValid = true

    if (!fields['title']) {
      formIsValid = false
      errors['title'] = 'deben contener un titulo.'
    }

    if (!fields['price']) {
      formIsValid = false
      errors['price'] = 'deben tener un valor de precio.'
    }

    if (!fields['type_reward']) {
      formIsValid = false
      errors['type_reward'] = 'debe contener un tipo de recompensa.'
    }

    if (!fields['currencies']) {
      formIsValid = false
      errors['currencies'] = 'debe contener un tipo de moneda.'
    }

    if (des_reward.length === 0) {
      formIsValid = false
      errors['des_reward'] = 'deben contener una descripcion.'
    }

    this.setState({errors: errors})

    return formIsValid
  }

  getRewardDetail = async rewardId => {
    let token = window.sessionStorage.getItem('token')

    await API.get(`/reward-detail/${rewardId}`, {
      headers: {Authorization: 'token ' + token},
    })
      .then(response => {
        this.setState({
          fields: response.data.data,
        })
      })
      .catch(err => console.log(err))
  }

  deleteReward = async rewardId => {
    let msg = ''
    let token = window.sessionStorage.getItem('token')
    await API.delete(`/reward`, {
      data: {id: rewardId},
      headers: {Authorization: 'token ' + token},
    })
      .then(res => {
        this.getRewards()
        msg = 'Recompensa Eliminada.'
        this.setState({
          msg: msg,
          visible: true,
        })
      })
      .catch(err => {
        let error = 'debe seleccionar una recompensa, para actualizar.'
        this.setState({msg: error})
        console.log(err)
      })
  }

  handleClick = rewardId => {
    this.getRewardDetail(rewardId)
    this.setState({visible: false})
  }

  handleRewarDel = rewardId => {
    if (window.confirm('Desea eliminar esta recompensa ?')) {
      this.deleteReward(rewardId)
    }
  }

  handleAddReward = async e => {
    e.preventDefault()

    if (this.validateForm()) {
      let campaing_id = window.localStorage.getItem('campaingId')
      let token = window.sessionStorage.getItem('token')
      let date = this.state.startDate
      let msg = ''

      await API.post(
        `/reward`,
        {
          campaing: campaing_id,
          title: this.state.fields.title,
          price: this.state.fields.price,
          type_reward: this.state.fields.type_reward,
          delivery_data: date,
          delivery_place: date,
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
            msg,
            visible: true,
          })
        })
        .catch(err => {
          console.log(err)
        })

      this.clear_fields(this.state.fields)
    }
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
                <p>
                  <span className="form-sub-warning">
                    * Todos los campos son Obligatorios al momento de ADICIONAR
                    una recompensa.
                  </span>
                </p>
              </label>
              <label className="col-md-10">
                <span className="form-sub-title">Titulo de recompensa</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.title || ''}
                  name="title"
                  onChange={this.handleChange}
                />
                <div className="MsgError">{this.state.errors.title}</div>
              </label>
              <label className="col-md-6">
                <span className="form-sub-title">valor de la recompensa</span>
                <input
                  type="numeric"
                  className="form-control"
                  value={this.state.fields.price || ''}
                  name="price"
                  onChange={this.handleChange}
                />
                <div className="MsgError">{this.state.errors.price}</div>
              </label>
              <label className="col-md-4">
                <span className="form-sub-title">Moneda</span>
                <select
                  className="form-control"
                  name="currencies"
                  onChange={this.handleChange}
                  value={this.state.fields.currencies || ''}>
                  <option value="0">Seleccionar una Moneda</option>
                  <option value="1">Bolivianos</option>
                  <option value="2">Dolares</option>
                </select>
                <div className="MsgError">{this.state.errors.currencies}</div>
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-10">
                <span className="form-sub-title">
                  Fecha estimada:{' '}
                  {`${new Date(
                    this.state.fields.delivery_data,
                  ).toLocaleDateString()}`}
                </span>

                <DatePicker
                  className="form-control"
                  name="date"
                  selected={this.state.startDate}
                  onChange={this.handleDate}
                />
              </label>
              <label className="col-md-10">
                <span className="form-sub-title">Tipo de Recompensa</span>
                <select
                  className="form-control"
                  name="type_reward"
                  onChange={this.handleChange}
                  value={this.state.fields.type_reward}>
                  <option value="0">Tipo de Recompensa</option>
                  <option value="1">Donacion</option>
                  <option value="2">Contribucion</option>
                </select>
                <div className="MsgError">{this.state.errors.type_reward}</div>
              </label>
            </div>

            <div className="form-group">
              <label className="col-md-10">
                <span className="form-sub-title">Descripcion</span>
                <p>
                  <span className="form-sub-title">
                    * La descripcion solo debe contener 35 palabras
                  </span>
                </p>
                <Editor
                  value={this.state.fields.description}
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
              <div
                className={`col-12 MsgSuccess ${
                  this.state.visible ? 'fadeIn' : 'fadeOut'
                }`}>
                {this.state.msg}
              </div>
              <div className="col-12 btn-group">
                <div className="col-6">
                  <button type="submit" className="btn btn-sm btn-primary">
                    ACTUALIZAR
                  </button>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={this.handleAddReward}
                    className="btn btn-sm btn-outline-info">
                    ADICIONAR
                  </button>
                </div>
              </div>
            </div>
          </form>

          <TableReward
            rewards={rewards}
            reward_btn={this.handleClick}
            reward_del={this.handleRewarDel}
          />
        </div>
      </div>
    )
  }
}

export default RewardForm
