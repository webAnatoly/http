import React from 'react';
// import PropTypes from 'prop-types';

/* Функция asyncComponent является компонентом высшего порядка и
реализует динамический импорт модуля (dynamic import).
В качестве коллбека принимается функция importComponent, которая должна возвращать Promise.


importComponent это функция-коллбэк такого вот вида: () => import('./NewPost/NewPost')
import('../path/to/your/file') это фича-функция из ECMAScript, для динамической подгрузки модулей
import('../path/to/your/file') возвращает Promise, а в качестве аргумента принимает путь к модулю,
который необходимо подгрузить динамически.


Подробнее можно почитать по ссылкам:
http://2ality.com/2017/01/import-operator.html - cтатья с примерами
https://github.com/tc39/proposal-dynamic-import
https://tc39.github.io/proposal-dynamic-import/ - Draft of spec for import()
https://webpack.js.org/api/module-methods/#import-  - использование import() в webpack

И так, что происходит тут у нас:
Мы вызываем importComponent(), получаем промис и если модуль найдет, то выполняем .then
далее:
  в cmp.default лежит наш компонент, который подгрузила функция import()
далее:
  записываем этот компонент в свойство state.component
далее:
  так как изменили состояние state, то будет снова запущена функция render()
  и отрендерить то что нам нужно.

Таким образом Hight Order Component  asyncComponent реализует технику ехники lazi loading
т.е. подгружает целевой модуль не сразу, а когда-нибудь потом.
*/

const asyncComponent = importComponent => (
  class extends React.Component {
    state = {
      component: null,
    }
    componentDidMount() {
      importComponent()
        .then((cmp) => {
          this.setState({ component: cmp.default });
        });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  });

// asyncComponent.propTypes = {

// };

// asyncComponent.defaultProps = {

// };

export default asyncComponent;
