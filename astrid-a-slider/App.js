import React, { Component } from 'react';
import AstridGroup from './AstridCarousel_new/astridGroup';
import AstridNavigator from './AstridCarousel_new/astridNavigator';
import AstridCarousel from './AstridCarousel_new';
import AstridPointer from './AstridCarousel_new/astridPointer';

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
]

class Pointer extends Component {
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
        }}
      >{to}</div>
    )
  }
}

class Navigator extends Component {
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
          width: ( vertical ? 200 : '100%' ),
          paddingTop: '100%',
          backgroundColor: (astrid_position === astrid_identity ? 'rgb(100,100,100)' : 'rgba(130,130,130,0.4)'),
          backgroundImage: this.background,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: 'solid 1px white'
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
  columns: 1,
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
  grid: false,
  axis: 'vertical',
}

class App extends Component {
  render() {
    return (
      <AstridGroup>
        <div style={{
          margin: '0 auto',
          width: 500,
          textAlign: 'center'
        }}>
          <h4 style={{
            textAlign: 'center',
            margin: '0 auto',
            padding: 5,
          }}>Regular width columns</h4>
          <AstridCarousel {...config}>
            {media_gallery_paths.map((item, indx, arr) => (<ImageComponent key={'top' + indx} image={arr[indx]} />))}
          </AstridCarousel>
        </div>

        <h4 style={{
          textAlign: 'center',
          margin: '0 auto',
          padding: 5,
        }}>Irregular as fuck width columns</h4>
        <div style={{
          margin: '0 auto',
          width: 500
        }}>
          <AstridCarousel {...config2}>
            {media_gallery_paths.map((item, indx, arr) => (<TextComponent key={'bottom' + indx} title={arr[indx]} index={indx} />))}
          </AstridCarousel>
        </div>
        <br />
        <h4 style={{
          textAlign: 'center',
          margin: 0,
          padding: 5,
        }}>Slider with active pointers</h4>
        <div style={{
          margin: '0 auto',
          width: 500
        }}>
          <AstridCarousel {...config3}>
            {media_gallery_paths.map((item, indx) => {
              return (
                <AstridPointer to={indx} key={'pointer' + indx}>
                  <Pointer to={indx} isThin={false} />
                </AstridPointer>
              )
            })}
          </AstridCarousel>
        </div>

        <br />
        <h4 style={{
          textAlign: 'center',
          margin: '0 auto',
          padding: 5,
        }}>Navigators L/R</h4>
        <div style={
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            width: '600px',
            position: 'relative'
          }
        }>
          <AstridNavigator by={-1}><Navigator title={'left'} by={-1} /></AstridNavigator>
          <AstridNavigator by={1}><Navigator title={'right'} by={1} /></AstridNavigator>
          <br />
        </div>

        <div style={{
          position: 'fixed',
          top: 0,
          left: '16%'
        }}>
          {media_gallery_paths.map((item, indx) => {
            return (
              <AstridPointer to={indx} key={'pointer' + indx}>
                <Pointer to={indx} isThin={true} />
              </AstridPointer>
            )
          })}
        </div>

        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 200,
        }}>
          <h4 style={{
            textAlign: 'center',
            margin: '0 auto',
            padding: 5,
          }}>Regular width columns</h4>
          <AstridCarousel {...config4}>
            {media_gallery_paths.map((item, indx, arr) => (<ImageComponent key={'top' + indx} image={arr[indx]} vertical={true}/>))}
          </AstridCarousel>
        </div>
      </AstridGroup>
    )
  }
}

export default App;