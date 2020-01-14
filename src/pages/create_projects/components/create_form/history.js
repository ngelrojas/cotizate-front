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


class HistoryForm extends React.Component{
    constructor(){
        super();
        this.state = {
            fields: {},
            error: {},
        }
    }

    onContentStateChange(contentState) {
        
        console.log(contentState);
    };
    
    onContentStateChange_(contentState) {
        
        console.log(contentState);
    };
    
    _onContentStateChange_(contentState) {
        
        console.log(contentState);
    };

    handleChange = e =>{
        e.preventDefault();
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({fields})
    }

    render(){
        return(
     <div className="container-site_on">
                <form method="post"> 
                    <div  className="container form-step-one">
                        <div className="form-group">
                            <label className="col-md-8">
                                <p><span className="form-sub-title">Agregar un video o imagen para la parte superior de tu proyecto.</span></p>
                                <p><span className="form-sub-title">Los proyectos con videos aumentan un porcentaje mas que los proyectos sin video, Has un video de 2-3 minutos.</span></p>
                                
                            </label>
                            <label className="col-md-8"><span className="form-sub-title">Coloca un video</span>
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
                            <label className="col-md-8"><span className="form-sub-title">Cuenta un poco sobre tu proyecto (resumen)</span>
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
                            <label className="col-md-8"><span className="form-sub-title">Cuenta por que tu proyecto es tan relevante, has una descripcion completa de tu proyecto.</span>
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
                        

                    </div>
                </form>
            </div>        
        ) 
    }
}

export default HistoryForm;
