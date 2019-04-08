import React, { Component } from 'react';
import AstridGroup from './astridGroup';
import AstridNavigator from './astridNavigator';
import AstridSlider from './carousel';

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
      mode: 'infinite',//'infinite'
      transition: {
        time: 300,
        curve: 'ease-in',
        style: 'translate', //or fade,
        mode: 'absolue' //relative
      },
    }

    this.group_a__slider_a = {
      items: media_gallery_paths.map((item, index) => {
        return ImageComponent;
      }),
      columns: 2,
    }

    this.group_a__slider_b = {
      items: media_gallery_paths.map((item, index) => {
        return TitleComponent;
      }),
      columns: 5,
    }

    this.group_b = {
      mode: 'finite',//'infinite'
      transition: {
        time: 300,
        curve: 'ease-in',
        style: 'translate', //or fade
        mode: 'absolute'//relative
      },
    }

    this.group_b__slider_a = {
      items: [],
      columns: 3,
    }
  }

  render() {
    let imageBlockStyle = {
      boxSizing: 'border-box',
      width: '100%',
      paddingTop: '100%',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      border: 'solid 1px gray',
    }

    return (
      <div style={{ width: '100%', minWidth: 200, maxWidth: 1200, margin: '0 auto'}}>
        <AstridGroup {...this.group_a}>
          <h2>Astrid Slider - infinite, components (current marked)</h2>
          <div style={{
            width: '50%',
            margin: '0 auto',
          }}>
            <AstridSlider {...this.group_a__slider_a} />
          </div>
          <AstridSlider {...this.group_a__slider_b} />

          <div style={{ width: '10%', margin: '0 auto' }}>
            <AstridNavigator by={-1}><span>left 1</span></AstridNavigator>
            <AstridNavigator by={1}><span>right 1</span></AstridNavigator>
            <br />
            <AstridNavigator by={-4}><span>left 4</span></AstridNavigator>
            <AstridNavigator by={4}><span>right 4</span></AstridNavigator>
          </div>
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
        <br /><br /><br /><br /><br /><br /><br /><br />
        <AstridGroup {...this.group_b}>
          <h2>Astrid Slider - finite, components (current marked)</h2>
          <AstridSlider {...this.group_b__slider_a}>
            {media_gallery_paths.map((item, index) => {
              return ImageComponent;
            })}
          </AstridSlider>
          <AstridNavigator by={-1}><span>left 1</span></AstridNavigator>
          <AstridNavigator by={1}><span>right 1</span></AstridNavigator>
        </AstridGroup>

        <br /><br /><br /><br /><br /><br /><br /><br />
        <AstridGroup {...this.group_b}>
          <h2>Astrid Slider - finite, html blocks (current not marked)</h2>
          <AstridSlider {...this.group_b__slider_a}>
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[0].title + FORMAT})`
            }} />
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[1].title + FORMAT})`
            }} />
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[2].title + FORMAT})`
            }} />
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[3].title + FORMAT})`
            }} />
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[4].title + FORMAT})`
            }} />
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[5].title + FORMAT})`
            }} />
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[6].title + FORMAT})`
            }} />
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[7].title + FORMAT})`
            }} />
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[8].title + FORMAT})`
            }} />
            <div style={{
              ...imageBlockStyle,
              backgroundImage: `url(${GALLERY_PATH + media_gallery_paths[9].title + FORMAT})`
            }} />
          </AstridSlider>
          <AstridNavigator by={-1}><span>left 1</span></AstridNavigator>
          <AstridNavigator by={1}><span>right 1</span></AstridNavigator>
        </AstridGroup>
      </div>
    );
  }
}

export default App;
