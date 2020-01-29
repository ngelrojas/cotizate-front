import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import './reward.css';


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

class RewardForm extends React.Component{

    constructor(){
        super();
        this.state = {
            fields: {},
            errors: {}
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
             
                    <div  className="row form-reward">
                        <form method="post" className="col-md-6"> 
                        <div className="form-group">
                            <label className="col-md-10"><span className="form-sub-title">Describe cuales son las Recompensas que ofreces.</span>
                            </label>
                            <label className="col-md-10"><span className="form-sub-title">Titulo de recompensa</span>
                            <input 
                                type="text" 
                                className="form-control"
                                value={this.state.fields.title_reward || ''}
                                name="title_reward"
                                onChange={this.handleChange}/>
                            </label>
                            <label className="col-md-6">
                                <span className="form-sub-title">valor de la recompensa</span>
                                <input 
                                    type="numeric"
                                    className="form-control"
                                    value={this.state.fields.price_reward || ''}
                                    name="price_reward"
                                    onChange={this.handleChange}/>
                            </label>
                            <label className="col-md-4"><span className="form-sub-title">Moneda</span>
                            <select 
                                className="form-control" 
                                name="currencies" 
                                onChange={this.handleChange} >
                                    <option value={this.state.fields.currencies || '1'}>Bolivianos</option>
                                    <option value={this.state.fields.currencies || '2'}>Dolares</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-10"><span className="form-sub-title">Fecha estimada</span>
                            <input 
                                type="date" 
                                className="form-control"
                                value={this.state.fields.date || ''}
                                name="date"
                                onChange={this.handleChange}/>
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="col-md-10"><span className="form-sub-title">Descripcion</span>
                            
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
                        <div className="row">
                            
                            <div className="col-6">
                                <button type="submit" className="btn btn-primary">CREAR</button>
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
        )}
};

export default RewardForm;

