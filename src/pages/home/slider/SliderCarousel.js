import React from 'react';
import {NavLink} from 'react-router-dom';
import Whirligig from 'react-whirligig';
import './css/slider.css';
import arrow_left from './img/left-arrow.svg';
import arrow_right from './img/right-arrow.svg';


const Slider = (props) => {
  let whirligig
  const next = () => whirligig.next()
  const prev = () => whirligig.prev()

  let listcat = props.catjson;
  let listimg = [];
  
  if( listcat.length > 0){
      // this.state.articles.map() replace with datajson.map
      listimg = listcat.map( function(cate) {
          console.log(cate);
          return(
            <NavLink key={cate.id} to={cate.url_link}><img src={cate.img} alt="cotizate" /></NavLink>
          )
      })
  
  }else{
      listimg = "<h3>category not found...!</h3>";
  }

  return (
    <div className="row slider-container">
        <div className="col col-6">
          <div className="slider-txt-category">
            <h5>{props.titleB}</h5>
          </div>
        </div>
        <div className="col col-6">
            <div className="slider-buttons">
              <button onClick={prev}><img src={arrow_left} alt="cotizate arrow"/></button>
              <button onClick={next}><img src={arrow_right} alt="cotizate arrow"/></button>
            </div>
        </div>
        <div className="slider-imgs">
          <Whirligig
                visibleSlides={5}
                gutter="1em"
                ref={(_whirligigInstance) => { whirligig = _whirligigInstance}}>
                {listimg}
          </Whirligig>        
        </div>

      
    </div>
  )
}

export default Slider;