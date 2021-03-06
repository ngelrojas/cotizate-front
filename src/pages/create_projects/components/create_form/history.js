import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import FilteredMultiSelect from 'react-filtered-multiselect'
import API from '../../../../conf/api.js'
import API_URL from '../../../../conf/apis.js'

class HistoryForm extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: {},
      errors: {},
      msg: {},
      excerpt: '',
      description: '',
      tags: '',
      selectedShips: [],
      sendTags: [],
    }
  }

  handleDeselect(index) {
    var selectedShips = this.state.selectedShips.slice()
    selectedShips.splice(index, 1)
    this.setState({selectedShips})
  }

  handleSelectionChange = selectedShips => {
    this.setState({selectedShips})
  }

  handleEditorExcerpt = (content, editor) => {
    this.setState({excerpt: content})
  }

  handleEditorDesc = (content, editor) => {
    this.setState({description: content})
  }

  handleChange = e => {
    e.preventDefault()
    let fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({fields})
  }

  handleChangeTags = selectOption => {
    this.setState({selectOption})
  }

  async getTags() {
    const data = await fetch(API_URL + `/tags`)
    const tag = await data.json()
    this.setState({tags: tag})
  }

  handleSaveRaised = async id => {
    let token = window.sessionStorage.getItem('token')
    await API.post(
      `/raised`,
      {
        amount: 0,
        before_amount: 0,
        count: 0,
        campaing: id,
      },
      {headers: {Authorization: 'token ' + token}},
    )
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSubmit = async e => {
    e.preventDefault()
    if (this.validateForm()) {
      let excerpt_data = this.state.excerpt
      let description_data = this.state.description
      let basic_data = JSON.parse(window.localStorage.getItem('basic'))
      let is_token = window.sessionStorage.getItem('token')
      let _msg = {}
      let tags = this.state.selectedShips
      let list_tags = []

      tags &&
        tags.map(tag => {
          list_tags.push(tag.id)
        })

      if (basic_data) {
        await API.post(
          `/campaing`,
          {
            title: basic_data[0],
            city: basic_data[1],
            category: basic_data[2],
            budget: basic_data[3],
            currencies: basic_data[4],
            qty_days: basic_data[5],
            facebook: basic_data[6],
            instagram: basic_data[7],
            linkedin: basic_data[8],
            twitter: basic_data[9],
            website: basic_data[10],
            tags: list_tags,
            video: this.state.fields.video,
            excerpt: excerpt_data,
            description: description_data,
          },
          {
            headers: {Authorization: 'token ' + is_token},
          },
        )
          .then(res => {
            _msg['success'] = 'segunda parte del proyecto guardado.'
            let _id = res.data.id
            this.setState({msg: _msg})
            window.localStorage.removeItem('basic')
            window.localStorage.setItem('campaingId', _id)
            this.handleSaveRaised(_id)
          })
          .catch(err => {
            _msg['error'] = 'por favor revise su proyecto'
            this.setState({msg: _msg})
            console.log(err)
          })
      } else {
        alert('por favor complete el apartado de Basico de su proyecto.')
      }
    }
  }

  validateForm() {
    let fields = this.state.fields
    let excerpt = this.state.excerpt
    let description = this.state.description
    let errors = {}
    let formIsValid = true

    if (!fields['video']) {
      formIsValid = false
      errors['video'] = 'Tu proyecto debe contener video.'
    }
    if (!excerpt) {
      formIsValid = false
      errors['excerpt'] = 'Tu proyecto debe contener un resumen.'
    }
    if (!description) {
      formIsValid = false
      errors['description'] =
        'Tu proyecto debe contener una description completa.'
    }
    if (this.state.selectedShips.length === 0) {
      formIsValid = false
      errors['tags'] = 'Tu proyecto debe contener por lo menos un tag.'
    }
    this.setState({errors: errors})
    return formIsValid
  }
  componentDidMount() {
    this.getTags()
  }

  render() {
    const {tags} = this.state
    const {selectedShips} = this.state

    return (
      <div className="container-site_on">
        <form method="post" onSubmit={this.handleSubmit}>
          <div className="container form-step-one">
            <div className="form-group">
              <label className="col-md-8">
                <p>
                  <span className="form-sub-title">
                    ingrese por lo menos un tag de la lista
                  </span>
                </p>

                <div className="MsgError">{this.state.errors.tags}</div>
                <FilteredMultiSelect
                  buttonText="SELECCIONAR"
                  showFilter={false}
                  onChange={this.handleSelectionChange}
                  options={tags}
                  selectedOptions={selectedShips}
                  textProp="name"
                  valueProp="id"
                />
                {selectedShips.length === 0 && <p>(lista de tags vacia)</p>}
                {selectedShips.length > 0 && (
                  <ul className="list-tags">
                    {selectedShips.map((ship, i) => (
                      <li key={ship.id}>
                        {`${ship.name} `}
                        <button
                          className="btn-remove"
                          type="button"
                          onClick={() => this.handleDeselect(i)}>
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-8">
                <p>
                  <span className="form-sub-title">
                    Agregar un video para la parte superior de tu proyecto.
                  </span>
                </p>
                <p>
                  <span className="form-sub-title">
                    Los proyectos con videos aumentan un porcentaje mas que los
                    proyectos sin video, Has un video de 2-3 minutos.
                  </span>
                </p>
              </label>
              <label className="col-md-8">
                <span className="form-sub-title">Coloca tu video</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fields.video || ''}
                  name="video"
                  onChange={this.handleChange}
                />
                <div className="MsgError">{this.state.errors.video}</div>
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">
                  Cuenta un poco sobre tu proyecto (resumen)
                </span>
                <p>
                  <span className="form-sub-title">
                    * El resumen solo debe contener 35 palabras.
                  </span>
                </p>
                <Editor
                  initialValue=""
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
                  onEditorChange={this.handleEditorExcerpt}
                />
                <div className="MsgError">{this.state.errors.excerpt}</div>
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">
                  Cuenta por que tu proyecto es tan relevante, has una
                  descripcion completa de tu proyecto.
                </span>
                <Editor
                  initialValue=""
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
                  onEditorChange={this.handleEditorDesc}
                />
                <div className="MsgError">{this.state.errors.description}</div>
              </label>
            </div>
          </div>
          <div className="container">
            <div className="col col-md-8 MsgSuccess">
              {this.state.msg.success}
            </div>
            <div className="MsgError">{this.state.msg.error}</div>
            <div className="col col-md-8">
              <button type="submit" className="btn btn-primary btn-sm">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default HistoryForm
