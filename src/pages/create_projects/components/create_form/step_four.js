import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

function  uploadImageCallBack(file) {
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

export const StepFour = ({state, handleChange, onContentStateChange ,onContentStateChange_, _onContentStateChange_ }) =>
{
        return(
            <div className="container-site_on">
             
                    <div  className="container form-step-one">
                      
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Describe cuales son las Recompensas que ofreces.</span>
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">Titulo de recompensa</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={state.fields.title_reward || ''}
                                name="title_reward"
                                onChange={handleChange}/>
                            </label>
                            <label className="col-md-6">
                                <span className="form-sub-title">valor de la recompensa</span>
                                <input 
                                    type="numeric"
                                    className="form-control"
                                    value={state.fields.price_reward || ''}
                                    name="price_reward"
                                    onChange={handleChange}/>
                            </label>
                            <label className="col-md-2"><span className="form-sub-title">Moneda</span>
                            <select 
                                className="form-control" 
                                name="currencies" 
                                onChange={handleChange} 
                                value={state.fields.currencies || ''}>
                                    <option value="1">Bolivianos</option>
                                    <option value="2">Dolares</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Fecha estimada</span>
                            <input 
                                type="date" 
                                className="form-control"
                                value={state.fields.date || ''}
                                name="date"
                                onChange={handleChange}/>
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="col-md-8"><span className="form-sub-title">Descripcion</span>
                            
                            <Editor
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onContentStateChange={onContentStateChange}
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
                        <div className="row">
                            <div className="col-6">
                                <button type="submit" className="btn btn-primary">Pre-visualizar</button>
                            </div>
                            <div className="col-6">
                                <button type="submit" className="btn btn-primary">Publicar</button>
                            </div>

                        </div>

                    </div>

            </div>
        ) 
};

export default StepFour;
