import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Blog from './containers/Blog/Blog';

class App extends Component {
  state = {}
  render() {
    return (
      <BrowserRouter basename="/">
        {/* basename указывается если приложение хостится не в корневую дерикторию,
        а в поддерриктронию например если http://mysite.com/my-app
        basename="/my-app"
         */}
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
