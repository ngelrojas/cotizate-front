import React, {Component} from 'react'
import './css/slider.css'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'
import './css/slider-animations.css'
import './css/styles.css'

const content = [
  {
    title: 'Vulputate Mollis Ultricies Fermentum Parturient',
    description:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Leer Mas',
    image: 'https://picsum.photos/1135/645?image=0',
    user: 'Luan Gjokaj',
    userProfile: 'https://i.imgur.com/JSW6mEk.png',
  },
  {
    title: 'Tortor Dapibus Commodo Aenean Quam',
    description:
      'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
    button: 'Descubrir',
    image: 'https://picsum.photos/1135/645?image=1',
    user: 'Erich Behrens',
    userProfile: 'https://i.imgur.com/0Clfnu7.png',
  },
  {
    title: 'Phasellus volutpat metus',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
    button: 'Mas Ideas',
    image: 'https://picsum.photos/1135/645?image=2',
    user: 'Bruno Vizovskyy',
    userProfile: 'https://i.imgur.com/4KeKvtH.png',
  },
]

class SliderComponent extends Component {
  render() {
    return (
      <div className="slider">
        <div className="slider-body">
          <Slider className="slider-wrapper">
            {content.map((item, index) => (
              <div
                key={index}
                className="slider-content"
                style={{
                  background: `url('${item.image}') no-repeat center center`,
                }}>
                <div className="inner">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <button>{item.button}</button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    )
  }
}
export default SliderComponent
