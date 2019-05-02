import React, { Component } from 'react';
/*import AstridGroup from './astridGroup';
import AstridNavigator from './astridNavigator';
import AstridSlider from './astridCarousel';*/
import AstridGroup from './AstridCarousel_new/astridGroup';
import AstridNavigator from './AstridCarousel_new/astridNavigator';
import AstridCarousel from './AstridCarousel_new';

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

class Navigator extends Component {
  render = () => {
    const { left_edge, right_edge, title, by } = this.props;
    const visible = ( left_edge && title === 'left' ) || (right_edge && title === 'right') ? false : true ;
    console.log(this.props)
    return(
      <div
        style={{
          padding: '10px 20px',
          opacity: ( visible ? 1 : 0.4 ),
          border: '1px red solid'
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
          height: (index % 2 === 0 ? 120 : 60),
          border: 'solid 1px green',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 5px'
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
          backgroundImage: this.background,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: 'solid 1px pink'
        }} />
    )
  }
}

const config = {
  columns: 2,
  mode: 'infinite',
  grid: true,
}

const config2 = {
  columns: 2,
  mode: 'infinite',
  grid: false,
}

class App extends Component {
  render() {
    return (
      <AstridGroup>
        <div style={{
          margin: '0 auto',
          width: 500
        }}>
          <AstridCarousel {...config}>
            {media_gallery_paths.map((item, indx, arr) => (<ImageComponent key={indx} image={arr[indx]} />))}
          </AstridCarousel>
        </div>
        <div style={{
          margin: '0 auto',
          width: 500
        }}>
          <AstridCarousel {...config2}>
            {media_gallery_paths.map((item, indx, arr) => (<TextComponent key={indx} title={arr[indx]} index={indx} />))}
          </AstridCarousel>
        </div>
        <br />
        <AstridNavigator by={-1}><Navigator title={'left'} by={-1}/></AstridNavigator>
        <AstridNavigator by={1}><Navigator title={'right'} by={1}/></AstridNavigator>
        <br />
        <AstridNavigator by={-4}><Navigator title={'left'} by={-4}/></AstridNavigator>
        <AstridNavigator by={4}><Navigator title={'right'} by={4}/></AstridNavigator>
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
