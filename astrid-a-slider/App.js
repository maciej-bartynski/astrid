import React, { Component } from 'react';
import { AstridDOMCarousel, AstridDOMGroup, AstridDOMNavigator } from './AstridDOMCarousel/index.js';
/*import AstridGroup from './AstridCarousel_new/astridGroup';
import AstridNavigator from './AstridCarousel_new/astridNavigator';
import AstridCarousel from './AstridCarousel_new';
import AstridPointer from './AstridCarousel_new/astridPointer';

import Description from './test/Description.js';
import Pointer from './test/Pointer.js';

const GALLERY_PATH = './media-gallery/';
const FORMAT = '.jpg';
const media_gallery_paths = [
  { title: 'animals' },
  { title: 'books' },
  { title: 'business' },
  { title: 'coins' },
  { title: 'frog' },
  { title: 'girl' },
  { title: 'literature' },
  { title: 'money' },
  { title: 'reading' },
  { title: 'tabletop-photography' },
  { title: 'water' },
]*/

class App extends Component {
  render() {
    const config = {
      mode: {
        scroll: 'finite', //infinite, returnable
        axis: 'horizontal', //vertical
        size: '100%', //css
        margin: '0 auto', //css
        fit_to: 'transverse', //view, both, none
        centering: true, //center, [number][unit: px, %]

      },
      columns: 1,
      onMove: (currPos, domArr, visible_items, pre_visible_items, post_visible_items, view_frame) => {
        domArr[currPos].style.border = 'solid 1px red';
        visible_items.forEach((item)=>{
          if (item.offsetHeight > view_frame.offsetHeight){
            //view_frame.style.height = item.offsetHeight+'px'
          }
        })
      },
      lazy:true,
      lazyMode:'visible'//pre_visible, post_visible
    }

    const config2 = {
      mode: {
        scroll: 'finite', //infinite, returnable
        axis: 'vertical', //vertical
        size: '100%', //css
        margin: '0 auto', //css
        fit_to: 'transverse', //view, both, none
        centering: true, //center, [number][unit: px, %],

      },
      columns: 1,
      onMove: (currPos, domArr) => {
        domArr[currPos].style.border = 'solid 1px red';
      }
    }

    return (
      <div>
        <AstridDOMGroup>
          <div style={{
            width: '50%',
            minWidth: '1000px',
            margin: '0 auto',
            border: 'solid 1px black',
          }}>
            <AstridDOMCarousel
              config={config}
            >
              <div 
                data-astrid-selector='gallery-item'
                style={{ border: 'solid 1px green', width: '43.33%' }}>
                <img 
                  data-astrid-lazy="true" 
                  data-astrid-lazy-src='./media-gallery/animals.jpg' 
                  data-astrid-lazy-style='width: 100%; display: block' 
                />
              </div>
              <div 
                data-astrid-selector='gallery-item'
                style={{ border: 'solid 1px green',width: '33.33%' }}>
                <img data-astrid-lazy="true" data-astrid-lazy-src='./media-gallery/books.jpg' data-astrid-lazy-style='width: 100%; display: block' />
              </div>
              <div 
                data-astrid-selector='gallery-item'
                style={{ border: 'solid 1px green',width: '33.33%' }}>
                <img data-astrid-lazy="true" data-astrid-lazy-src='./media-gallery/animals.jpg' data-astrid-lazy-style='width: 100%; display: block' />
              </div>
              <div
                data-astrid-selector='gallery-item'
                style={{ border: 'solid 1px green', width: '133px' }}>
                <img data-astrid-lazy="true" data-astrid-lazy-src='/media-gallery/business.jpg' data-astrid-lazy-style='width: 100%; display: block' />
              </div>
              <div 
                data-astrid-selector='gallery-item'
                style={{ border: 'solid 1px green',width: '33.33%', height: 300 }}>
                <img data-astrid-lazy="true" data-astrid-lazy-src='./media-gallery/coins.jpg' data-astrid-lazy-style='width: 100%; display: block' />
              </div>
              <div
                data-astrid-selector='gallery-item' 
                style={{ border: 'solid 1px green',width: '23.33%', height: 400 }}>
                <img data-astrid-lazy="true" data-astrid-lazy-src='./media-gallery/frog.jpg' data-astrid-lazy-style='width: 100%; display: block' />
              </div>
              <div 
                data-astrid-selector='gallery-item'
                style={{ border: 'solid 1px green',width: '33.33%', height: 200 }}>
                <img data-astrid-lazy="true" data-astrid-lazy-src='./media-gallery/girl.jpg' data-astrid-lazy-style='width: 100%; display: block' />
              </div>
            </AstridDOMCarousel>
          </div>

          <div style={{
            width: '50%',
            minWidth: '1000px',
            margin: '0 auto',
            border: 'solid 1px black',
          }}>
            {/*<AstridDOMCarousel
              config={config}
            >
              <img
                data-astrid-selector='gallery-item'
                data-astrid-lazy="true" 
                data-astrid-lazy-src='./media-gallery/animals.jpg' 
                style={{ border: 'solid 1px green', width: '43.33%' }}
              />
           
              <img
                data-astrid-selector='gallery-item'
                style={{ border: 'solid 1px green',width: '33.33%' }}
                data-astrid-lazy="true" 
                data-astrid-lazy-src='./media-gallery/books.jpg' 
              />
                           
                <img 
                  data-astrid-selector='gallery-item'
                  style={{ border: 'solid 1px green',width: '33.33%' }} 
                  data-astrid-lazy="true" 
                  data-astrid-lazy-src='./media-gallery/animals.jpg' 
                />
              
                <img 
                  data-astrid-selector='gallery-item'
                  style={{ border: 'solid 1px green',width: '133px'}} 
                  data-astrid-lazy="true" 
                  data-astrid-lazy-src='/media-gallery/business.jpg' 
                />
              
                <img
                  data-astrid-selector='gallery-item'
                  style={{ border: 'solid 1px green',width: '33.33%' }}
                  data-astrid-lazy="true" 
                  data-astrid-lazy-src='./media-gallery/coins.jpg' 
                />
              
                <img 
                  data-astrid-selector='gallery-item'
                  style={{ border: 'solid 1px green',width: '23.33%', height: 400 }}
                  data-astrid-lazy="true" 
                  data-astrid-lazy-src='./media-gallery/frog.jpg' 
                />
            
             
                <img 
                  data-astrid-selector='gallery-item'
                  style={{ border: 'solid 1px green',width: '33.33%', height: 200 }} 
                  data-astrid-lazy="true" 
                  data-astrid-lazy-src='./media-gallery/girl.jpg' 
              />
              
            </AstridDOMCarousel>*/}
        </div>

          {/*<div style={{
            margin: '0 auto',
            border: 'solid 1px black',
            height: 600
          }}>
            <AstridDOMCarousel
              config={config2}
            >
              <div style={{ height: '300px' }} data-astrid-selector='gallery-item'>
                <img style={{ height: '100%', display: 'block' }} src='./media-gallery/animals.jpg' />
              </div>
              <div style={{ height: '400px' }} data-astrid-selector='gallery-item'>
                <img style={{ height: '100%', display: 'block' }} src='./media-gallery/books.jpg' />
              </div>
              <div style={{ height: '400px' }} data-astrid-selector='gallery-item'>
                <img style={{ height: '100%', display: 'block' }} src='./media-gallery/animals.jpg' />
              </div>
              <div style={{ height: '133px' }} data-astrid-selector='gallery-item'>
                <img style={{ height: '100%', display: 'block' }} src='./media-gallery/business.jpg' />
              </div>
              <div style={{ height: '400px' }} data-astrid-selector='gallery-item'>
                <img style={{ height: '100%', display: 'block' }} src='./media-gallery/coins.jpg' />
              </div>
              <div style={{ height: '200px' }} data-astrid-selector='gallery-item'>
                <img style={{ height: '100%', display: 'block' }} src='./media-gallery/frog.jpg' />
              </div>
              <div style={{ height: '400px' }} data-astrid-selector='gallery-item'>
                <img style={{ height: '100%', display: 'block' }} src='./media-gallery/girl.jpg' />
              </div>
            </AstridDOMCarousel>
        </div>*/}

          <AstridDOMNavigator move={1} />
          <AstridDOMNavigator move={-2} />

        </AstridDOMGroup>
      </div>
    )
  }
}

/*class Pointer extends Component {
  render = () => {
    const { to, active_position, isThin } = this.props;

    return (
      <div
        style={{
          padding: '10px',
          width: '100%',
          textAlign: 'center',
          border: '1px white solid',
          display: 'inline-block',
          boxSizing: 'border-box',
          color: 'white',
          background: (to === active_position ? 'gray' : 'rgba(0,0,0,0.2'),
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >{to}</div>
    )
  }
}*/

/*class Navigator extends Component {
  render = () => {
    const { left_edge, right_edge, active_position, title, by } = this.props;
    const visible = (left_edge && title === 'left') || (right_edge && title === 'right') ? false : true;

    return (
      <div
        style={{
          padding: '10px 20px',
          opacity: (visible ? 1 : 0.4),
          background: 'gray',
          color: 'white',
          border: '1px solid white',
          cursor: 'pointer',
          width: 250,
          display: 'inline-block',
          boxSizing: 'border-box',
        }}
      >{title}{' '}{by} </div>
    )
  }
}

class TextComponent extends Component {
  render = () => {
    const { title, index, astrid_identity, astrid_position } = this.props;

    let variableHeight = () => {
      let hei;
      if (index > 4) {
        hei = (index + 1) * 30;
      } else {
        hei = 250 - ((index + 1) * 30);
      }
      return hei + 'px'
    }

    return (
      <div
        style={{
          height: variableHeight(),
          border: 'solid 1px rgb(200,200,200)',
          borderTop: 'none',
          color: 'white',
          background: (astrid_position === astrid_identity ? 'rgb(130,130,130)' : 'rgba(130,130,130,0.4)'),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: (index % 2 === 0 || index === 5 ? index % 2 === 0 ? 'unset' : '200px' : '450px'),
          padding: (index % 2 === 0 ? '5px 5px' : '5px 20px'),
          boxSizing: 'border-box',
        }}>{title.title}</div>
    )
  }
}

class VerticalTextComponent extends Component {
  render = () => {
    const { title, index, astrid_identity, astrid_position } = this.props;

    return (
      <div
        style={{
          border: 'solid 1px rgb(200,200,200)',
          borderTop: 'none',
          color: 'white',
          background: (astrid_position === astrid_identity ? 'rgb(130,130,130)' : 'rgba(130,130,130,0.4)'),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: (index % 2 === 0 || index === 5 ? index % 2 === 0 ? 'unset' : '200px' : '450px'),
          height: (index % 2 === 0 || index === 5 ? index % 2 === 0 ? '300px' : '400px' : '450px'),
          boxSizing: 'border-box',
          padding: (index % 2 === 0 ? '5px 5px' : '5px 20px'),
        }}>{title.title}</div>
    )
  }
}

class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.background = '';
    this.mediaGalleryPath();
  }

  mediaGalleryPath = () => {
    const { image: { title }, astrid_identity, astrid_position } = this.props;
    this.background = `url(${GALLERY_PATH + title + FORMAT})`;
  }

  render = () => {
    const { vertical, astrid_identity, astrid_position } = this.props;
    return (
      <div
        style={{
          width: (vertical ? 200 : '100%'),
          paddingTop: (vertical ? 'unset' : '100%'),
          height: (vertical ? '100%' : 'unset'),
          backgroundColor: (astrid_position === astrid_identity ? 'rgb(100,100,100)' : 'rgba(130,130,130,0.4)'),
          backgroundImage: this.background,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: 'solid 1px white',
          boxSizing: 'border-box',
        }} />
    )
  }
}

const config = {
  columns: 2,
  mode: 'finite',
  grid: true,
}

const config2 = {
  columns: 3,
  mode: 'finite',
  grid: false,
}

const config3 = {
  columns: 3,
  mode: 'finite',
  grid: true,
}

const config4 = {
  columns: 3,
  mode: 'finite',
  grid: true,
  axis: 'vertical',
}

const config5 = {
  columns: 3,
  mode: 'finite',
  grid: false,
  axis: 'vertical',
}

const config6 = {
  columns: 2,
  mode: 'finite',
  grid: true,
  axis: 'vertical',
}


class App extends Component {
  render() {
    return (

    )
    return (
      <div className='root'>
        <div className='gridContainer'>
          <AstridGroup>

            <div className='gridTop'>
              <h1>Astrid. A carousel.</h1>
              <div className='navigatorsContainer'>
                <AstridNavigator by={-1}><Navigator title={'left'} by={-1} /></AstridNavigator>
                <AstridNavigator by={1}><Navigator title={'right'} by={1} /></AstridNavigator>
              </div>
            </div>

            <div className='horizontalSlider_grid'>
              <h2>Horizontal, cells: grid</h2>
              <AstridCarousel {...config}>
                {media_gallery_paths.map((item, indx, arr) => (<ImageComponent key={'top' + indx} image={arr[indx]} />))}
              </AstridCarousel>
            </div>

            <div className='horizontalSlider_noGrid'>
              <h2>Horizontal, cells: nogrid (irregular as fuck)</h2>
              <div className='carouselWrapperToShowSize'>
                <AstridCarousel {...config2}>
                  {media_gallery_paths.map((item, indx, arr) => (<Description key={indx} title={arr[indx]} />))}
                </AstridCarousel>
              </div>
            </div>
            <div className='horizontalSlider_pointers'>
              <h2>Carousel with pointers (clickable)</h2>
              <AstridCarousel {...config3}>
                {media_gallery_paths.map((item, indx) => {
                  return (
                    <AstridPointer to={indx} key={'pointer' + indx}>
                      <Pointer to={indx} />
                    </AstridPointer>
                  )
                })}
              </AstridCarousel>
            </div>
            <div className='verticalSlider_grid'>
              <AstridCarousel {...config4}>
                {media_gallery_paths.map((item, indx, arr) => (<ImageComponent key={'top' + indx} image={arr[indx]} vertical={true} />))}
              </AstridCarousel>
            </div>
            <div className='verticalSlider_noGrid'>
              <div className='carouselWrapperToShowSize_vert'>
                <AstridCarousel {...config5}>
                  {media_gallery_paths.map((item, indx, arr) => (<Description key={indx} title={arr[indx]} />))}
                </AstridCarousel>
              </div>
            </div>
            <div className='verticalSlider_pointers'>
              <AstridCarousel {...config6}>
                {media_gallery_paths.map((item, indx) => {
                  return (
                    <AstridPointer to={indx} key={'pointer' + indx}>
                      <Pointer to={indx} isThin={false} />
                    </AstridPointer>
                  )
                })}
              </AstridCarousel>
            </div>
          </AstridGroup>

        </div>
      </div>

    )
  }
}*/

export default App;