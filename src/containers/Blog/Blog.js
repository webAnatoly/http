import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

// import Aux from '../../hoc/Aux';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
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
                <NavLink
                  to="/posts"
                  exact
                  activeClassName="my-active" // Можно свой класс добавить
                >
                  Posts
                </NavLink>
                {/* Link и  NavNavLink не перезагружают страницу
                потому-что реакт на onclick вешает пустую функцию */}
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post',
                    hash: '#sumbit',
                    search: '?quick-submit=true',
                  }}
                  activeStyle={{ // Можно инлайн стили
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  Add Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/new-post" component={NewPost} />
          <Route path="/posts" component={Posts} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
