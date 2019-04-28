import React, { Component } from 'react';
/*import AstridGroup from './astridGroup';
import AstridNavigator from './astridNavigator';
import AstridSlider from './astridCarousel';*/
import AstridGroup from './astrid/Group';
import AstridNavigator from './astrid/Navigator';
import AstridSlider from './astrid/Carousel';

class AstridItem extends Component {
  render = () => {
    return (
      <div className='MyItem_grid'>
        {this.props.title} <br />
        {this.props.someProp}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <AstridGroup>
        <h1>Grid</h1>
        <AstridSlider
          mode={'finite'} //'finite', 'return'
          draggable={true}
          pixel_width={1000}
          fit_height={true} //DOM operation!

          align={{
            left: true, //default
            center: true,
            custom: '3%'
          }}

          /**
           * Grid OR inline.
           * If both, only grid is dispatched,
           */
          grid={{
            columns: 2,
            rows: 1
          }}

          /**
           * Translate OR fade.
           * If both, only translate is dispatched
           */
          translate={{
            time: {
              duration: 300,
              per_column: false,
            },
            curve: 'ease-in', // all css curves
          }}
          fade={{
            time: 300,
            curve_in: 'ease-in', // all css curves
            curve_out: 'ease-out' // all css curves
          }}
        >
          <AstridItem someProp='ups' />
          <div className='MyItem_grid'>1</div>
          <div className='MyItem_grid'>2</div>
          <div className='MyItem_grid'>3</div>
          <div className='MyItem_grid'>4</div>
          <div className='MyItem_grid'>5</div>
          <div className='MyItem_grid'>6</div>
          <div className='MyItem_grid'>7</div>
          <div className='MyItem_grid'>8</div>
         
        </AstridSlider>
        <h1>Inline</h1>
        <AstridSlider
          mode={'finite'} //'finite', 'return'
          draggable={true}
          pixel_width={1000}
          fit_height={true} //DOM operation!

          align={{
            left: true, //default
            center: true,
            custom: '3%'
          }}
          /* INLINE  */
          inline={true}
          /**
           * Translate OR fade.
           * If both, only translate is dispatched
           */
          translate={{
            time: {
              duration: 300,
              per_column: false,
            },
            curve: 'ease-in', // all css curves
          }}
          fade={{
            time: 300,
            curve_in: 'ease-in', // all css curves
            curve_out: 'ease-out' // all css curves
          }}
        >
          <div className='MyItem_inline'>1</div>
          <div className='MyItem_inline'>2</div>
          <div className='MyItem_inline'>3</div>
          <div className='MyItem_inline'>4</div>
          <div className='MyItem_inline'>5</div>
          <div className='MyItem_inline'>6</div>
          <div className='MyItem_inline'>7</div>
          <div className='MyItem_inline'>8</div>
          <div className='MyItem_inline'>9</div>
        </AstridSlider>
        <h1>Inline extended</h1>
        <AstridSlider
          mode={'finite'} //'finite', 'return'
          draggable={true}
          pixel_width={1000}
          fit_height={true} //DOM operation!

          align={{
            left: true, //default
            center: true,
            custom: '3%'
          }}
          /* Inline extended */
          inline_extended={true}
          /**
           * Translate OR fade.
           * If both, only translate is dispatched
           */
          translate={{
            time: {
              duration: 300,
              per_column: false,
            },
            curve: 'ease-in', // all css curves
          }}
          fade={{
            time: 300,
            curve_in: 'ease-in', // all css curves
            curve_out: 'ease-out' // all css curves
          }}
        >
          <ul className='MyItem_inline_ex__list-conteiner'>
            <li data-astrid_selector='astrid-item' className='MyItem_inline_ex'>1</li>
            <li data-astrid_selector='astrid-item' className='MyItem_inline_ex'>2</li>
            <li data-astrid_selector='astrid-item' className='MyItem_inline_ex'>3</li>
            <li data-astrid_selector='astrid-item' className='MyItem_inline_ex'>4</li>
          </ul>
          <div data-astrid_selector='astrid-item' className='MyItem_inline_ex'>5</div>
          <div data-astrid_selector='astrid-item' className='MyItem_inline_ex'>6</div>
          <div data-astrid_selector='astrid-item' className='MyItem_inline_ex'>7</div>
          <div className='MyItem_inline_ex__div-conteiner'>
            <div data-astrid_selector='astrid-item' className='MyItem_inline_ex'>8</div>
            <div data-astrid_selector='astrid-item' className='MyItem_inline_ex'>9</div>
          </div>
        </AstridSlider>
        <br />
        <AstridNavigator by={-1}><span>left 1</span></AstridNavigator>
        <AstridNavigator by={1}><span>right 1</span></AstridNavigator>
        <br />
        <AstridNavigator by={-4}><span>left 4</span></AstridNavigator>
        <AstridNavigator by={4}><span>right 4</span></AstridNavigator>
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
