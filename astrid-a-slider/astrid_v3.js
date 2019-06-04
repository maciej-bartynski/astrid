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
      touch: true,
      touch_sensibility: 2,
      transition: {
        time: 300, //milisec
        curve: 'linear', //all css curves
        type: 'transform' //fade
      },
     
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
        scroll: 'infinite', //infinite, returnable
        axis: 'vertical', //vertical
        size: '100%', //css
        margin: '0 auto', //css
        fit_to: 'transverse', //view, both, none
        centering: true, //center, [number][unit: px, %],

      },
      transition: {
        time: 300, //milisec
        curve: 'linear', //all css curves
        type: 'fade', //'transform' //fade
      }
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
                style={{ border: 'solid 1px green', width: '50%' }}>
                <img
                  src='./media-gallery/animals.jpg'
                  style={{
                    width: '100%',
                    display: 'block'
                  }}
                />
              </div>
              <div
                style={{ border: 'solid 1px green', width: '50%' }}>
                <img src='./media-gallery/books.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', width: '50%' }}>
                <img src='./media-gallery/animals.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', width: '50%' }}>
                <img src='/media-gallery/business.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', width: '50%', height: 300 }}>
                <img src='./media-gallery/coins.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', width: '50%', height: 400 }}>
                <img src='./media-gallery/frog.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', width: '50%', height: 200 }}>
                <img src='./media-gallery/girl.jpg' style={{ width: '100%', display: 'block' }} />
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
                  style={{
                    width: '100%',
                    display: 'block'
                  }}
                />
              </div>
              <div
                style={{ border: 'solid 1px green', height: '30%' }}>
                <img src='./media-gallery/books.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', height: '70%' }}>
                <img src='./media-gallery/animals.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', height: '10%' }}>
                <img src='/media-gallery/business.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', height: '120px', height: 300 }}>
                <img src='./media-gallery/coins.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', height: '50px', height: 400 }}>
                <img src='./media-gallery/frog.jpg' style={{ width: '100%', display: 'block' }} />
              </div>
              <div
                style={{ border: 'solid 1px green', height: '300px', height: 200 }}>
                <img src='./media-gallery/girl.jpg' style={{ width: '100%', display: 'block' }} />
              </div>

            </AstridDOMCarousel>
          </div>

          <AstridDOMNavigator slide={1}>
            <p style={{
              width: 100,
              height: 30,
              cursor: 'pointer',
              border: 'solid 1px red'
            }}>+1</p>
          </AstridDOMNavigator>
          <AstridDOMNavigator slide={-1}>
            <p style={{
              width: 100,
              height: 30,
              cursor: 'pointer',
              border: 'solid 1px red'
            }}>-1</p>
          </AstridDOMNavigator>

          <AstridDOMNavigator jump={4}>
            <p style={{
              width: 100,
              height: 30,
              cursor: 'pointer',
              border: 'solid 1px red'
            }}>to 4</p>
          </AstridDOMNavigator>

          <AstridDOMNavigator jump={0}>
            <p style={{
              width: 100,
              height: 30,
              cursor: 'pointer',
              border: 'solid 1px red'
            }}>to 0</p>
          </AstridDOMNavigator>

          <AstridDOMNavigator jump={6}>
            <p style={{
              width: 100,
              height: 30,
              cursor: 'pointer',
              border: 'solid 1px red'
            }}>to 6</p>
          </AstridDOMNavigator>


          {/*<AstridDOMNavigator jump={7}>
            <p style={{
              width: 100,
              height: 30,
              cursor: 'pointer',
              border: 'solid 1px red'
            }}>to 7</p>
          </AstridDOMNavigator>


          <AstridDOMNavigator jump={5}>
            <p style={{
              width: 100,
              height: 30,
              cursor: 'pointer',
              border: 'solid 1px red'
            }}>to 5</p>
          </AstridDOMNavigator>


          <AstridDOMNavigator jump={0}>
            <p style={{
              width: 100,
              height: 30,
              cursor: 'pointer',
              border: 'solid 1px red'
            }}>to 0</p>
          </AstridDOMNavigator>*/}
        </AstridDOMGroup>
      </div>
    )
  }
}

export default Astrid_v3;