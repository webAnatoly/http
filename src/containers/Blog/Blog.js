import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

// import Aux from '../../hoc/Aux';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';
import './Blog.css';

const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));
/* Функция AsyncNewPost реализует динамическую подгрузку модуля(компонента) NewPost.js:
В качестве коллбека передается анонимная функция которая возвращает вызов функции import()
import('../path/to/your/file') это фича из ECMAScript, для динамической подгрузки модулей
import('../path/to/your/file') возвращает Promise, а в качестве аргумента принимает путь к модулю,
который необходимо подгрузить динамически.
Подробнее можно почитать по ссылкам:
http://2ality.com/2017/01/import-operator.html - cтатья с примерами
https://github.com/tc39/proposal-dynamic-import
https://tc39.github.io/proposal-dynamic-import/ - Draft of spec for import()
https://webpack.js.org/api/module-methods/#import-  - использование import() в webpack
*/

class Blog extends Component {
  state = {
    auth: true,
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
          {/* здесь в свойстве component вместо NewPost мы использует HOC
            AsyncNewPost для реализации техники azi loading
            Такой способ динамической подгрузки модуля работает только в react-route 4 версии
          */}
          {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
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
