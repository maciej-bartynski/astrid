import React, { Component } from 'react';
import AstridGroup from './astridGroup';
import AstridNavigator from './astridNavigator';
import AstridSlider from './carousel';

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
    let cell = {
      width: '100%',
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'solid 1px green'
    }

    return (
      <div>

        <AstridGroup {...this.group_a}>
          <AstridSlider {...this.group_a__slider_a}>
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
          <AstridNavigator by={-1}><span>left</span></AstridNavigator>
          <AstridNavigator by={3}><span>right</span></AstridNavigator>
        </AstridGroup>

        <AstridGroup {...this.group_b}>
          <AstridSlider {...this.group_b__slider_a}>
            <div style={cell}>a</div>
            <div style={cell}>b</div>
            <div style={cell}>c</div>
            <div style={cell}>d</div>
            <div style={cell}>e</div>
            <div style={cell}>f</div>
            <div style={cell}>g</div>
            <div style={cell}>h</div>
          </AstridSlider>
          <AstridNavigator by={-3}><span>left</span></AstridNavigator>
          <AstridNavigator by={1}><span>right</span></AstridNavigator>
        </AstridGroup>

      </div>
    );
  }

}

export default App;
