import React, { Component } from 'react';
import './App.css';
import AstridCarousel from './track.js'

import { Astrid } from './track.js'

let NewCarousel = new Astrid();

class App extends Component {

  constructor(props) {
    super(props);

    this.config = {
      settings: {

      },

      sliders: [
        {
          items: this.getColumnPlaceholder(7),
          columns: 4
        }
      ]
    }
  }

  getColumnPlaceholder = (index) => {
    return [1,2,3,4,5,6,7].map((item, idx)=>{
      if (idx === 3 ) {
      
        return (props)=> {
          let innerTxtum = props.isVisible ? 'I am visible' : '' ;
          let innerLoc = props.isCurrent ? '...and i am current' : '';
          let innerPos = '...and my adress is ' + props.adress ;

          return (<div key={idx} style={{ width: '100%', height: '200px', border: 'solid 1px black', boxSizing: 'border-box'}}>
            I am {idx} <br/>
            ....................<br/>
            {innerTxtum}<br/>
            {innerLoc}<br/>
            {innerPos}
          </div>
        )}
      }
      return (
        <div key={idx} style={{ width: '100%', height: '200px', border: 'solid 1px black', boxSizing: 'border-box'}}>
          I am {idx}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
      <AstridCarousel config={this.config} />
      <br/>
      <br/>
      <br/>

      <NewCarousel.AstridCarousel config={this.config} />
      <span><NewCarousel.AstridNavigation direction="left">
        <button>Left</button>
      </NewCarousel.AstridNavigation> 

      <NewCarousel.AstridNavigation direction="right">
        <button>Right</button>
      </NewCarousel.AstridNavigation>
      </span>
      <br/>
      <br/>
      <br/>

      <NewCarousel.AstridCarousel config={this.config} />
      <span><NewCarousel.AstridNavigation direction="left">
        <button>Left</button>
      </NewCarousel.AstridNavigation> 

      <NewCarousel.AstridNavigation direction="right">
        <button>Right</button>
      </NewCarousel.AstridNavigation>
      </span>
      </div>
    );
  }

}

export default App;
