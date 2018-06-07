import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

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
              <li>
                <Link to="/">HOME</Link>
                {/* Link не перезагружает страницу */}
              </li>
              <li>
                <Link to={
                  {
                    pathname: '/new-post',
                    hash: '#sumbit',
                    search: '?quick-submit=true',
                  }}
                >
                  Add Post
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <Route path="/" component={Posts} />
        <Route path="/new-post" component={NewPost} />
      </div>
    );
  }
}

export default Blog;
