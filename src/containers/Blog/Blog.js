import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

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
                <NavLink to="/">HOME</NavLink>
                {/* Link и  NavNavLink не перезагружают страницу
                потому-что реакт на onclick вешает пустую функцию */}
              </li>
              <li>
                <NavLink to={
                  {
                    pathname: '/new-post',
                    hash: '#sumbit',
                    search: '?quick-submit=true',
                  }}
                >
                  Add Post
                </NavLink>
              </li>
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
