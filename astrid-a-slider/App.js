import React, { Component } from 'react';
import AstridGroup from './astridGroup';
import AstridNavigator from './astridNavigator';
import AstridSlider from './astridCarousel';

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
