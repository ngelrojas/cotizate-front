import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';


function uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

class FormPerson extends Component
{
    state = {
        editorState: undefined,
        contentState: {}
    };

    onContentStateChange(contentState) {
        
        console.log(contentState);
    };

    render(){
        return(
            <div className="container">
                <form>
                    <div className="row">
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputname">Nombre</label>
                            <input type="text" className="form-control" id="inputname" aria-describedby="nameHelp" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputlastname">Apellido</label>
                            <input type="text" className="form-control" id="inputlastname" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputbirthdate">Fecha de Nacimiento</label>
                            <input type="date" className="form-control" id="inputbirthdate" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputnacionality">Nacionalidad</label>
                            <input type="text" className="form-control" id="inputnacionality" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputci">Numero de Documento(C.I.)</label>
                            <input type="numeric" className="form-control" id="inputci" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputcity">Ciudad</label>
                            <input type="text" className="form-control" id="inputcity" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputcellphone">Numero de Celular/Telefono</label>
                            <input type="numeric" className="form-control" id="inputcellphone" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputzone">Zona/Barrio</label>
                            <input type="text" className="form-control" id="inputzone" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputstreet">Calle</label>
                            <input type="numeric" className="form-control" id="inputstreet" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputnumber">Numero</label>
                            <input type="text" className="form-control" id="inputnumber" />
                        </div>

                        <div className="col col-8 box-form">
                            <label className="label-form" htmlFor="inputemail">E-mail</label>
                            <input type="text" className="form-control" id="inputemail" />
                        </div>
                        
                        <div className="col col-6 box-form">
                            <label className="label-form">Image de Perfil</label>
                            <label className="label-form">Esta imagen sera utilizada como</label>
                            <label className="label-form">una miniatura de su perfil (JPG, PNG)</label>
                        </div>
                        <div className="col col-6 box-form">
                            <img src="https://picsum.photos/200" alt="cotizate" className="img-thumbnail" />
                            <input type="file" />
                        </div>

                        <div className="col col-8 box-form">
                            <label className="label-form" htmlFor="inputbiography">Breve Biografia</label>
                            <Editor
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onContentStateChange={this.onContentStateChange}
                                toolbar={{
                                    inline: { inDropdown: true },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    link: { inDropdown: true },
                                    history: { inDropdown: true },
                                    image: { uploadCallback: uploadImageCallBack, 
                                        alt: { present: true, mandatory: false } },
                                }}
                            />
                        </div>
                        
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputfacebook">Facebook</label>
                            <input type="text" className="form-control" id="inputfacebook" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputtwitter">Twitter</label>
                            <input type="text" className="form-control" id="inputtwitter" />
                        </div>

                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputinstagram">Instagram</label>
                            <input type="text" className="form-control" id="inputinstagram" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputlinkedin">LinkedIn</label>
                            <input type="text" className="form-control" id="inputlinkedin" />
                        </div>

                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputweb1">Web site 1 (opcional)</label>
                            <input type="numeric" className="form-control" id="inputweb1" />
                        </div>
                        <div className="col col-6 box-form">
                            <label className="label-form" htmlFor="inputweb2">Web site 2 (opcional)</label>
                            <input type="text" className="form-control" id="inputweb2" />
                        </div>
                        
                        <div className="btn-group-form-person"></div>

                        <div className="col col-6 box-form">
                            <NavLink to="/" className="btn btn-primary btn-step-one">GUARDAR</NavLink>
                        </div>
                        <div className="col col-6 box-form">
                            <NavLink to="preview" className="btn btn-primary btn-step-one">VISUALIZAR Y LANZAR SU PROYECTO</NavLink>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default FormPerson;