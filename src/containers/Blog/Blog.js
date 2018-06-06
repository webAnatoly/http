import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

// import Aux from '../../hoc/Aux';
import Posts from '../Blog/Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {}
  render() {
    return (
      <div>
        <header className="Blog">
          <nav>
            <ul>
              <li><Link to="/">HOME</Link></li> {/* Link не перезагружает страницу */}
              <li><Link to="/new-post">Add Post</Link></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/new-post" component={NewPost} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
