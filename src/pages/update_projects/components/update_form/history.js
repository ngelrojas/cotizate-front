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
        this.setState({
          fields: response.data,
          selectedShips: response.data.tags,
        })
      })
  }

  handleSubmit = async e => {
    e.preventDefault()
    if (this.validateForm()) {
      let excerpt_data = this.state.excerpt
        ? this.state.excerpt
        : this.state.fields.excerpt
      let description_data = this.state.description
        ? this.state.description
        : this.state.fields.description
      let campaingId = window.localStorage.getItem('campaingId')
      let token = window.sessionStorage.getItem('token')
      let _msg = {}
      let tags = this.state.selectedShips
      let list_tags = []

      tags &&
        tags.map(tag => {
          list_tags.push(tag.id)
        })

      fetch(API_URL + `/campaing`, {
        method: 'PUT',
        headers: {
          Authorization: 'token ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: campaingId,
          video: this.state.fields.video,
          excerpt: excerpt_data,
          description: description_data,
          tags: list_tags,
        }),
      })
        .then(resp => resp.json())
        .then(response => {
          _msg['success'] = 'segunda parte del proyecto actualizada.'
          this.setState({msg: _msg})
        })
        .catch(err => {
          _msg['error'] = 'por favor intentalo mas tarde.'
          this.setState({msg: _msg})
        })
    }
  }

  validateForm() {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true

    if (!fields['video']) {
      formIsValid = false
      errors['video'] = 'Tu proyecto debe contener video.'
    }
    if (!fields['excerpt']) {
      formIsValid = false
      errors['excerpt'] = 'Tu proyecto debe contener un resumen.'
    }
    if (!fields['description']) {
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
    this.getCampaings()
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
                    Agregar un video o imagen para la parte superior de tu
                    proyecto.
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
                <span className="form-sub-title">Coloca un video</span>
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
                <Editor
                  initialValue={this.state.fields.excerpt}
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
                  initialValue={this.state.fields.description}
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
              <button type="submit" className="btn btn-primary">
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
