import React, { Component } from 'react';
import MemoryGame from './MemoryGame';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

class App extends Component {
  static defaultProps = {
    cards: [
      {id:1, icon:'fab fa-accusoft', key:uuidv4()}, 
      {id:1, icon:'fab fa-accusoft', key:uuidv4()}, 
      {id:2, icon:'fab fa-affiliatetheme', key:uuidv4()}, 
      {id:2, icon:'fab fa-affiliatetheme', key:uuidv4()},
      {id:3, icon:'fab fa-android', key:uuidv4()}, 
      {id:3, icon:'fab fa-android', key:uuidv4()}, 
      {id:4, icon:'fab fa-apple', key:uuidv4()}, 
      {id:4, icon:'fab fa-apple', key:uuidv4()}, 
      {id:5, icon:'fas fa-atom', key:uuidv4()}, 
      {id:5, icon:'fas fa-atom', key:uuidv4()}, 
      {id:6, icon:'fab fa-chrome', key:uuidv4()}, 
      {id:6, icon:'fab fa-chrome', key:uuidv4()}, 
      {id:7, icon:'fab fa-fly', key:uuidv4()}, 
      {id:7, icon:'fab fa-fly', key:uuidv4()}, 
      {id:8, icon:'fab fa-github', key:uuidv4()}, 
      {id:8, icon:'fab fa-github', key:uuidv4()}]
  }
  render() {
  return (
    <div className="App">
     <MemoryGame cards= {this.props.cards}/>
    </div>
   );
  }
}

export default App;
