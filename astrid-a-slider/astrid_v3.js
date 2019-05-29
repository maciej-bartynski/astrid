import React, { Component } from 'react';
import { AstridDOMCarousel, AstridDOMGroup, AstridDOMNavigator } from './AstridDOMCarousel/index.js';

class Astrid_v3 extends Component {
  render() {
    const config = {
      mode: {
        scroll: 'finite', //infinite, returnable
        axis: 'horizontal', //vertical
        size: '100%', //css
        margin: '0 auto', //css
        fit_to: 'transverse', //view, both, none
        centering: false, //center, [number][unit: px, %]

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

export default Astrid_v3;