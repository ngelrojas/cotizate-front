import React from 'react';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {NavLink} from 'react-router-dom';

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

class StepTwo extends React.Component
{
    state = {
        editorState: undefined,
        contentState: {}
    };

    onContentStateChange(contentState) {
        
        console.log(contentState);
    };
    
    onContentStateChange_(contentState) {
        
        console.log(contentState);
    };
    
    _onContentStateChange_(contentState) {
        
        console.log(contentState);
    };

    render(){

        return(
            <div className="container-site_on">
             
                    <div  className="container form-step-one">
                        <div className="form-group">
                            <label className="col-md-8">
                                <p><span className="form-sub-title">Agregar un video o imagen para la parte superior de tu proyecto.</span></p>
                                <p><span className="form-sub-title">Los proyectos con videos aumentan un porcentaje mas que los proyectos sin video, Has un video de 2-3 minutos.</span></p>
                                
                            </label>
                            <label className="col-md-8"><span className="form-sub-title"> 7.- Coloca un video</span>
                                <input type="text" className="form-control"/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">8.- Cuenta un poco sobre tu proyecto (resumen)</span>
                            <Editor
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onContentStateChange={this._onContentStateChange_}
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
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">9.- Cuenta por que tu proyecto es tan relevante, has una descripcion completa de tu proyecto.</span>
                            <Editor
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onContentStateChange={this.onContentStateChange_}
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
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">10.- Describe cuales son las Recompensas que ofreces.</span>
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">Tipo de recompensa</span>
                                <input type="text" className="form-control" />
                            </label>
                            <label className="col-md-2"><span className="form-sub-title">Precios</span>
                            <select className="form-control">
                                    <option>Dolares</option>
                                    <option>Bolivianos</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Fecha estimada</span>
                                <input type="date" className="form-control" />
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Descripcion</span>
                            
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

                            </label>
                        
                        </div>
                        
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Donde se entregaran las recompensas</span>
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">Incluya los gastos de envio a la hora de establecer los niveles de recompnesa.</span>
                                <input type="radio" />
                            </label>
                        </div>
                        <div className="btn-group btn-group-toggle_" data-toggle="buttons">
                            <label className="btn btn-secondary_">
                                <input type="radio" name="options" id="option1"   /> Solo en Bolivia
                            </label>
                            <label className="btn btn-secondary_">
                                <input type="radio" name="options" id="option2"  /> A qualquier pais
                            </label>
                        </div> 

                    </div>

            </div>
        )
    }
}

export default StepTwo;
