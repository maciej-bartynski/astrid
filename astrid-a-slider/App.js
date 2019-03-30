import React, { Component } from 'react';
import AstridGroup from './astridGroup';
import AstridNavigator from './astridNavigator';
import AstridSlider from './astridDataLayer';

class App extends Component {

  constructor(props) {
    super(props);
    this.cell = {
      width: '25%',
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'solid 1px green'
    }

    this.config = {
      mode: 'infinite',//'infinite'
      transition: {
        time: 300,
        curve: 'ease-in',
        style: 'translate', //or fade,
        mode: 'absolue' //relative
      },
      items: [
        <div style={this.cell} key={1}>1</div>,
        <div style={this.cell} key={2}>2</div>,
        <div style={this.cell} key={3}>3</div>,
        <div style={this.cell} key={4}>4</div>,
        <div style={this.cell} key={5}>5</div>,
        <div style={this.cell} key={6}>6</div>,
        <div style={this.cell} key={7}>7</div>,
        <div style={this.cell} key={8}>8</div>
      ],
      columns: 4,
    }

    this.config_b = {
      mode: 'finite',//'infinite'
      transition: {
        time: 300,
        curve: 'ease-in',
        style: 'translate', //or fade
        mode: 'absolute'//relative
      },
      items: [],
      columns: 4,
    }
  }

  render() {
    let cell = {
      width: '25%',
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'solid 1px green'
    }

    return (
      <div>

        <AstridGroup>
          <AstridSlider {...this.config}>
            <div style={cell}>a</div>
            <div style={cell}>b</div>
            <div style={cell}>c</div>
            <div style={cell}>d</div>
            <div style={cell}>e</div>
            <div style={cell}>f</div>
            <div style={cell}>g</div>
            <div style={cell}>h</div>
          </AstridSlider>
          <div>Some othern, no-astrid element</div>
          <AstridNavigator direction={'right'}><span>right</span></AstridNavigator>
          <AstridNavigator direction={'left'}><span>left</span></AstridNavigator>
        </AstridGroup>

        <AstridGroup>
          <AstridSlider {...this.config_b}>
            <div style={cell}>a</div>
            <div style={cell}>b</div>
            <div style={cell}>c</div>
            <div style={cell}>d</div>
            <div style={cell}>e</div>
            <div style={cell}>f</div>
            <div style={cell}>g</div>
            <div style={cell}>h</div>
          </AstridSlider>
          <AstridNavigator direction={'right'}><span>right</span></AstridNavigator>
          <AstridNavigator direction={'left'}><span>left</span></AstridNavigator>
        </AstridGroup>
      </div>
    );
  }

}

export default App;
