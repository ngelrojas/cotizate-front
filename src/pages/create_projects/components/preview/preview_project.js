import React, {Component} from 'react';
import FooterHome from '../../../../footer/FooterComponent';
import YouTube from 'react-youtube';
import '../../css/preview.css';
import Tabs from '../../../tabs/Tabs';
import img_p from './img/background-one.jpg';
import avatar from './img/rounded.jpg';
import heart from './img/heart.svg';
import facebook from '../../../../footer/img/facebook.svg';
import twitter from '../../../../footer/img/twitter.svg';
import linkedin from '../../../../footer/img/linkedin.svg';
import instagram from '../../../../footer/img/instagram.svg';
import CardReward from './card_rewards/rewards';


class PreviewProject extends Component
{
    render(){
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
        };
        return(
            <div className="container-site_on">
                <div className="container">
                    <div className="row preview-row">
                        <div className="col-8">
                            <h5 className="preview-h">MUCHO MAS QUE MIEL</h5>
                            <div className="preview-videos">
                                <YouTube
                                    videoId="WI4-HUn8dFc"
                                    opts={opts}
                                />
                            </div>
                            <div className="row preview-spans">
                                <div className="col-4">Proyecto agricola</div>
                                <div className="col-4">Emprendedor</div>
                                <div className="col-4">Santa Cruz-Bolivia</div>
                            </div>
                            <div className="row preview-tabs">
                                <Tabs>
                                    <div label="Descricion">
                                        <div className="row">   
                                            <p className="preview-p">
                                            What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
 the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
 of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
 but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
  in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
  recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                            </p>
                                        </div>
                                        <div className="row d-flex justify-content-center"> 
                                            <img src={img_p} className="img-responsive" alt="cotizate"/> 
                                            
                                        </div>
                                        <p></p>
                                        <p className="preview-p">
                                            What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
 the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
 of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
 but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
  in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
  recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </p>
                                        <p></p>
                                        <div className="row d-flex justify-content-center"> 
                                            <img src={img_p} className="img-responsive" alt="cotizate"/> 
                                            
                                        </div>
                                        <p></p>
                                        <p className="preview-p">
                                            What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
 the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
 of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
 but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
  in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
  recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </p>
                                        <p></p>
                                        <div className="row d-flex justify-content-center"> 
                                            <img src={img_p} className="img-responsive" alt="cotizate"/> 
                                            
                                        </div>
                                        <p></p>
                                        <p className="preview-p">
                                            What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
 the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
 of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
 but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
  in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
  recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </p>

                                    <div className="btn-save d-flex justify-content-center">
                                        <button className="btn btn-lg btn-primary botton-save">Guardar</button>
                                    </div>

                                    </div>
                                    <div label="Novedades">
                                        
                                        <div className="row">
                                            <h5>novedades</h5>
                                        </div>
                                        
                                    </div>
                                    <div label="Apoyadores">
                                        <div className="row">
                                        <h5>apoyadores</h5>
                                        </div>
                                    </div>
                                    <div label="Comentarios">
                                        <div className="row">
                                        <h5>comentarios</h5>
                                        </div>
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                        <div className="col-4">
                            <h5 className="h5-t">PROYECTO CREADO POR</h5>
                            <div className="avatar">
                                <img src={avatar} alt="cotizate avatar" className="rounded-circle rounded-sm" />
                                <div className="data-preview">
                                    <p>Monic Pereira</p>
                                    <p><span></span>www.monic.com</p>
                                    <p><span></span>monic@someweb.com</p>
                                </div>
                            </div>
                            <div className="data-preview-meta">
                                <h5>Meta 2000 USD</h5>
                            </div>
                            
                            <div className="data-preview-bar">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                </div>
                            </div>
                            
                            <div className="data-preview-meta">
                                <h5>Alcanzo 15000 USD</h5>
                            </div>

                            <div className="data-preview-apoyado">
                                <p>Apoyado por 60 personas</p>
                            </div>
                            
                            <div className="data-preview-btn-apoyar d-flex justify-content-center">
                                <button className="btn btn-warning btn-apoyar">APOYAR PROYECTO</button>
                            </div>

                            <div className="data-preview-followers">
                                <div className="heart">
                                    <span>seguir <img className="img-heart" src={heart} alt="cotizate like"/></span>
                                </div>
                                <div className="heart-count">
                                    <span>seguidores 5</span>
                                </div>
                            </div>

                            <div className="data-preveiw-social-network">
                                <div className="data-preview-meta d-flex justify-content-center">
                                    <h5>Comparte este proyecto</h5>
                                </div>
                                <div className="icons-social-networks">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-2"><img src={facebook} alt="cotizate facebook" className="img-responsive-social-preview" /></div>
                                        <div className="col-2"><img src={twitter} alt="cotizate twitter" className="img-responsive-social-preview"/></div>
                                        <div className="col-2"><img src={linkedin} alt="cotizate linkedin" className="img-responsive-social-preview"/></div>
                                        <div className="col-2"><img src={instagram} alt="cotizate instagram" className="img-responsive-social-preview"/></div>
                                    </div>
                                </div>

                            </div>

                            <div className="content-contributions">
                                
                                <div className="box-form col-12">
                                    <div className="inline-form d-flex justify-content-center">
                                        <label>
                                            <span>Contribuir sin recompensa</span>
                                            <input type="text" className="form-control"/>
                                        </label>
                                    </div>                      
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-warning btn-contributions btn-lg">CONTINUAR</button>
                                    </div>
                                </div>

                                <CardReward />

                                <CardReward />

                                <CardReward />
                                

                            </div>
                            


                        </div>
                    </div>
                    
                    
                </div>
                <FooterHome />
            </div>
        )
    }   
}

export default PreviewProject;
