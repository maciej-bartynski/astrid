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
    
    return(
      <div
        style={{
          padding: '10px',
          width: '100%',
          textAlign: 'center',
          border: '1px white solid',
          display: 'inline-block',
          boxSizing: 'border-box',
          color: 'white',
          background: ( to === active_position ? 'gray' : 'rgba(0,0,0,0.2'),
          cursor: 'pointer',
        }}
      >{to}</div>
    )
  }
}

class Navigator extends Component {
  render = () => {
    const { left_edge, right_edge, active_position, title, by } = this.props;
    const visible = ( left_edge && title === 'left' ) || (right_edge && title === 'right') ? false : true ;

    return(
      <div
        style={{
          padding: '10px 20px',
          opacity: ( visible ? 1 : 0.4 ),
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
    const { title, index } = this.props;
    return (
      <div
        style={{
          height: 60,
          border: 'solid 1px rgb(200,200,200)',
          borderTop: 'none',
          color: 'white',
          background: 'rgb(130,130,130)',
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
    const { image: { title } } = this.props;
    this.background = `url(${GALLERY_PATH + title + FORMAT})`;
  }

  render = () => {
    return (
      <div
        style={{
          width: '100%',
          paddingTop: '100%',
          backgroundColor: 'rgb(100,100,100)',
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
  columns: 5,
  mode: 'finite',
  grid: false,
}

const config3 = {
  columns: 3,
  mode: 'finite',
  grid: true,
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
            {media_gallery_paths.map((item, indx, arr) => (<ImageComponent key={'top'+indx} image={arr[indx]} />))}
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
            {media_gallery_paths.map((item, indx, arr) => (<TextComponent key={'bottom'+indx} title={arr[indx]} index={indx} />))}
          </AstridCarousel>
        </div>
        <br/>
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
            {media_gallery_paths.map((item, indx)=>{
              return (
                <AstridPointer to={indx} key={'pointer' +indx}>
                  <Pointer to={indx} isThin={false}/>
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
          <AstridNavigator by={-1}><Navigator title={'left'} by={-1}/></AstridNavigator>
          <AstridNavigator by={1}><Navigator title={'right'} by={1}/></AstridNavigator>
          <br />
        </div>

        <div style={{
          position: 'fixed',
          top: 0,
          left: '16%'
        }}>
          {media_gallery_paths.map((item, indx)=>{
            return (
              <AstridPointer to={indx} key={'pointer' +indx}>
                <Pointer to={indx} isThin={true}/>
              </AstridPointer>
            )
          })}
          </div>
      </AstridGroup>
    )
  }
}

export default App;

/* OLD PROJECT
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

class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.loaded = false;
    this.background = '';
  }

  idRet = () => {
    const { keyIndex } = this.props;
    return media_gallery_paths[keyIndex].title;
  }

  mediaGalleryPath = () => {
    const { keyIndex } = this.props;
    const title = media_gallery_paths[keyIndex].title;
    this.background = `url(${GALLERY_PATH + title + FORMAT})`;
    this.loaded = true;
  }

  render = () => {
    const { visible, current } = this.props;
    if (!this.loaded && visible) {
      this.mediaGalleryPath();
    }
    return (
      <div
        id={this.idRet() + this.dupa}
        key={this.idRet() + this.dupa}
        style={{
          boxSizing: 'border-box',
          width: '100%',
          paddingTop: '100%',
          backgroundImage: this.background,
          backgroundColor: (visible || current) ? current ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.7)',
          transition: 'background-color 500ms linear',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: current ? 'solid 1px red' : 'solid 1px gray',
        }} />
    )
  }
}

const TitleComponent = (props) => {
  let { current, visible, keyIndex } = props;
  const title = media_gallery_paths[keyIndex].title;

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: 50,
        color: current ? 'white' : 'gray',
        border: current ? 'solid 2px red' : 'solid 2px gray',
        background: current ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {title}
    </div>
  )
}

class App extends Component {

  constructor(props) {
    super(props);
    this.cell = {
      width: '100%',
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'solid 1px green'
    }

    this.group_a = {
      transition: {
        time: 300,
        curve: 'ease-in',
        style: 'translate', //or fade,
        mode: 'absolue' //relative
      },
    }

    this.group_a__slider_a = {
      items: media_gallery_paths.map((item, index) => {
        ImageComponent.dupa = index;
        return ImageComponent;
      }),
      mode: 'infinite',
      columns: 2,
      transition: {
        time: 300,
        curve: 'ease-in',
        style: 'translate', //or fade,
        mode: 'absolue' //relative
      },
    }

    this.group_a__slider_b = {
      items: media_gallery_paths.map((item, index) => {
        return TitleComponent;
      }),
      mode: 'infinite',
      columns: 5,
      transition: {
        time: 200,
        curve: 'linear',
        style: 'translate', //or fade,
        mode: 'absolue' //relative
      },
    }
  }

  render() {
    return (
      <div style={{ width: '100%', minWidth: 200, maxWidth: 1200, margin: '0 auto' }}>
        <AstridGroup {...this.group_a}>
          <AstridSlider {...this.group_a__slider_a} />
          <AstridSlider {...this.group_a__slider_b} />

          <AstridNavigator by={-1}><span>left 1</span></AstridNavigator>
          <AstridNavigator by={1}><span>right 1</span></AstridNavigator>
          <br />
          <AstridNavigator by={-4}><span>left 4</span></AstridNavigator>
          <AstridNavigator by={4}><span>right 4</span></AstridNavigator>
        </AstridGroup>
        <br />
        <button
          style={{ padding: 10, margin: '0 auto', display: 'block' }}
          onClick={
            () => {
              this.group_a__slider_a = {
                ...this.group_a__slider_a,
                columns: 1,
              }
              this.group_a__slider_b = {
                ...this.group_a__slider_b,
                columns: 6,
              }
              this.setState({
                bool: !this.bool
              })
            }
          }>
          Change columns amount
        </button>
      </div>
    );
  }
}

export default App;

*/
