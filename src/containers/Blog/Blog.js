import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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
              <li><a href="/">HOME</a></li>
              <li><a href="/new-post">Add Post</a></li>
            </ul>
          </nav>
        </header>
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" component={NewPost} />
      </div>
    );
  }
}

export default Blog;
