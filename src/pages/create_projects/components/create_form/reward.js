import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import './reward.css'

class RewardForm extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: {},
      errors: {},
    }
  }

  handleEditorReward = (content, editor) => {
    console.log('Content was updated reward:', content)
  }

  handleChange = e => {
    e.preventDefault()
    let fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({fields})
  }

  render() {
    return (
      <div className="container-site_on">
        <div className="row form-reward">
          <form method="post" className="col-md-6">
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
              </label>
              <label className="col-md-4">
                <span className="form-sub-title">Moneda</span>
                <select
                  className="form-control"
                  name="currencies"
                  onChange={this.handleChange}>
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
              </label>
            </div>

            <div className="form-group">
              <label className="col-md-10">
                <span className="form-sub-title">Descripcion</span>

                <Editor
                  initialValue="<p>escribe aqui la descripcion de la recompensa.</p>"
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
                  onEditorChange={this.handleEditorReward}
                />
              </label>
            </div>
            <div className="row">
              <div className="col-6">
                <button type="submit" className="btn btn-primary">
                  CREAR
                </button>
              </div>
            </div>
          </form>
          <div className="list-rewards col-md-6">
            <h6>LISTA DE PREMIOS</h6>
            <table className="table">
              <thead>
                <tr>
                  <td>TITULO</td>
                  <td>VALOR</td>
                  <td>MONEDA</td>
                  <td colSpan="2">OPCIONES</td>
                  <td>&nbsp;</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>new reward</td>
                  <td>45.25</td>
                  <td>bolivanos</td>
                  <td>editar</td>
                  <td>eliminar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default RewardForm
