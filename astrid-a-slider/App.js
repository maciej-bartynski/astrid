import React, { Component } from 'react';
import AstridGroup from './astridGroup';
import AstridNavigator from './astridNavigator';
import AstridSlider from './carousel';

import ExampleHook from './hooks/ExampleHook';

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
      columns: 2,
    }

    this.group_a__slider_b = {
      items: [
        <div style={this.cell} id={1} key={1}>1</div>,
        <div style={this.cell} id={2} key={2}>2</div>,
        <div style={this.cell} id={3} key={3}>3</div>,
        <div style={this.cell} id={4} key={4}>4</div>,
        <div style={this.cell} id={5} key={5}>5</div>,
        <div style={this.cell} id={6} key={6}>6</div>,
        <div style={this.cell} id={7} key={7}>7</div>,
        <div style={this.cell} id={8} key={8}>8</div>
      ],
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
        <ExampleHook/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <br/>
        <AstridGroup {...this.group_a}>
          <div style={{
            width: '50%',
            margin: '0 auto',
          }}>
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
          </div>
          <AstridSlider {...this.group_a__slider_b}>
            <div style={cell}>a</div>
            <div style={cell}>b</div>
            <div style={cell}>c</div>
            <div style={cell}>d</div>
            <div style={cell}>e</div>
            <div style={cell}>f</div>
            <div style={cell}>g</div>
            <div style={cell}>h</div>
          </AstridSlider>

          <AstridNavigator by={-1}><span>left</span></AstridNavigator>
          <AstridNavigator by={1}><span>right</span></AstridNavigator>

          <AstridNavigator by={-4}><span>left</span></AstridNavigator>
          <AstridNavigator by={4}><span>right</span></AstridNavigator>


        </AstridGroup>
        <br /><br /><br /><br /><br /><br /><br /><br />

          <button onClick={
            ()=>{
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
                columns: 1,
              }

              this.group_a__slider_b = {
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
                columns: 6,
              }
              this.setState({
                bool: !this.bool
              })
            }
          }>
            Change props for upper slider
          </button>
        <br /><br /><br /><br /><br /><br /><br /><br />
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
          <AstridNavigator by={-1}><span>left</span></AstridNavigator>
          <AstridNavigator by={1}><span>right</span></AstridNavigator>
        </AstridGroup>

      </div>
    );
  }

}

export default App;
