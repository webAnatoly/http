import React, { Component } from 'react';
import Blog from './containers/Blog/Blog';

class App extends Component {
  state = {}
  render() {
    return (
      <div className="App">
        <Blog />
      </div>
    );
  }
}

export default App;
