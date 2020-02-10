import React from 'react'
import {Editor} from '@tinymce/tinymce-react'

class HistoryForm extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: {},
      error: {},
      excerpt: '',
      descripcion: '',
    }
  }

  handleEditorExcerpt = (content, editor) => {
    console.log('Content was updated excerpt:', content)
  }

  handleEditorDesc = (content, editor) => {
    console.log('Content was updated descripcion:', content)
  }

  handleChange = e => {
    e.preventDefault()
    let fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({fields})
  }

  handleSubmit = e => {
    e.preventDefault()
    let excerpt_data = this.state.excerpt
    let description_data = this.state.descripcion
    let basic_data = JSON.parse(window.localStorage.getItem('basic'))
    //console.log(data[0]);
    console.log(excerpt_data)
    console.log(description_data)
    if (this.validateForm()) {
    }
  }

  validateForm() {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true
    let msg = {}

    if (!fields['video']) {
      formIsValid = false
      errors['video'] = 'Tu proyecto debe contener video.'
    }
  }

  render() {
    return (
      <div className="container-site_on">
        <form method="post" onSubmit={this.handleSubmit}>
          <div className="container form-step-one">
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
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">
                  Cuenta un poco sobre tu proyecto (resumen)
                </span>
                <Editor
                  initialValue="<p>escribe aqui el resumen de tu proyecto.</p>"
                  init={{
                    height: 500,
                    menubar: true,

                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor image',
                      'imagetools earchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
                     alignleft aligncenter alignright alignjustify | image | \
                     imagetools bullist numlist outdent indent | removeformat | help',
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

                          /* call the callback and populate the Title field with the file name */
                          cb(blobInfo.blobUri(), {title: file.name})
                        }
                        reader.readAsDataURL(file)
                      }

                      input.click()
                    },
                  }}
                  onEditorChange={this.handleEditorExcerpt}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-8">
                <span className="form-sub-title">
                  Cuenta por que tu proyecto es tan relevante, has una
                  descripcion completa de tu proyecto.
                </span>
                <Editor
                  initialValue="<p>escribe aqui la descripcion completa de tu proyecto.</p>"
                  init={{
                    height: 500,
                    menubar: true,

                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor image',
                      'imagetools earchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
                     alignleft aligncenter alignright alignjustify | image | \
                     imagetools bullist numlist outdent indent | removeformat | help',
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

                          /* call the callback and populate the Title field with the file name */
                          cb(blobInfo.blobUri(), {title: file.name})
                        }
                        reader.readAsDataURL(file)
                      }

                      input.click()
                    },
                  }}
                  onEditorChange={this.handleEditorDesc}
                />
              </label>
            </div>
          </div>
          <div className="container">
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
