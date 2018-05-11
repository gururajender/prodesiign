import React, {Component} from 'react';
import Header from './Header'
import FlashMessagesList from './Flash/FlashMessagesList'

class App extends Component{
  render(){
    return (
      <div>
        <Header/>
        <FlashMessagesList/>
        {this.props.children}
      </div>
    );
  }
 }

export default App;
