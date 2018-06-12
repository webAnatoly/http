import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

// import Aux from '../../hoc/Aux';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    auth: false,
  }
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
          {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Not found</h1>} />
          {/* С помощью Redirect перенаправляем с одной "страницы" на другую. */}
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
