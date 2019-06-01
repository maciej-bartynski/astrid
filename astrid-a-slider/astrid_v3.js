import React, { Component } from 'react';
import { AstridDOMCarousel, AstridDOMGroup, AstridDOMNavigator } from './AstridDOMCarousel/index.js';

class Astrid_v3 extends Component {
  render() {
    const config = {
      mode: {
        scroll: 'infinite', //infinite, returnable
        axis: 'horizontal', //'horizontal', //vertical
        size: '100%', //css
        margin: '0 auto', //css
        fit_to: 'transverse', //view, both, none
        centering: false, //center, [number][unit: px, %]
      },
      columns: 2, //just logical value
      //onMove: (currPos, domArr, visible_items, pre_visible_items, post_visible_items, view_frame) => {
      //  domArr[currPos].style.border = 'solid 1px red';
      //  visible_items.forEach((item)=>{
      //    if (item.offsetHeight > view_frame.offsetHeight){
      //      //view_frame.style.height = item.offsetHeight+'px'
      //    }
      //  })
      //},
      //lazy:true,
      //lazyMode:'visible'//pre_visible, post_visible
    }

    const config2 = {
      mode: {
        scroll: 'returnable', //infinite, returnable
        axis: 'vertical', //vertical
        size: '100%', //css
        margin: '0 auto', //css
        fit_to: 'transverse', //view, both, none
        centering: true, //center, [number][unit: px, %],

      },
      columns:2,
      //onMove: (currPos, domArr) => {
      //  domArr[currPos].style.border = 'solid 1px red';
      //}
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
                style={{ border: 'solid 1px green', width: '60%' }}>
                <img 
                  src='./media-gallery/animals.jpg' 
                  style={{width: '100%', 
                  display: 'block'}} 
                />
              </div>
              <div 
                style={{ border: 'solid 1px green',width: '30%' }}>
                <img src='./media-gallery/books.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div 
                style={{ border: 'solid 1px green',width: '70%' }}>
                <img src='./media-gallery/animals.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div
                style={{ border: 'solid 1px green', width: '10%' }}>
                <img src='/media-gallery/business.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div 
                style={{ border: 'solid 1px green',width: '120px', height: 300 }}>
                <img src='./media-gallery/coins.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div 
                style={{ border: 'solid 1px green',width: '50px', height: 400 }}>
                <img src='./media-gallery/frog.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div 
                style={{ border: 'solid 1px green',width: '300px', height: 200 }}>
                <img src='./media-gallery/girl.jpg' style={{width: '100%', display: 'block'}} />
              </div>
            </AstridDOMCarousel>
            </div>

          <div style={{
            width: '50%',
            minWidth: '100px',
            margin: '0 auto',
            border: 'solid 1px black',
            height: 300
          }}>
            <AstridDOMCarousel
              config={config2}
            >
              <div 
                style={{ border: 'solid 1px green', height: '60%' }}>
                <img 
                  src='./media-gallery/animals.jpg' 
                  style={{width: '100%', 
                  display: 'block'}} 
                />
              </div>
              <div 
                style={{ border: 'solid 1px green',height: '30%' }}>
                <img src='./media-gallery/books.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div 
                style={{ border: 'solid 1px green',height: '70%' }}>
                <img src='./media-gallery/animals.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div
                style={{ border: 'solid 1px green',height: '10%' }}>
                <img src='/media-gallery/business.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div 
                style={{ border: 'solid 1px green',height: '120px', height: 300 }}>
                <img src='./media-gallery/coins.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div 
                style={{ border: 'solid 1px green',height: '50px', height: 400 }}>
                <img src='./media-gallery/frog.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              <div 
                style={{ border: 'solid 1px green',height: '300px', height: 200 }}>
                <img src='./media-gallery/girl.jpg' style={{width: '100%', display: 'block'}} />
              </div>
              
            </AstridDOMCarousel>
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

export default Astrid_v3;