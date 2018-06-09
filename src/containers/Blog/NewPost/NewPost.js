import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Max',
  }

  postDataHandler = () => {
    const myData = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
    };
    axios.post('/posts', myData)
    /* Метод POST для отправки данных на сервер.
    axios сам конвертирует объект в JSON формат */
      .then((res) => {
        /* Так как используется тестовый сервер jsonplaceholder.typicode.com
        то в случае успешной отправки данных этот сервер просто возвращает эти данные обратно.
        На реальном сервере естественно с этими данными можно что-то делать.
        Ну и в ответ он конечно же тоже что-то пришлёт.
        Например http заголовки, статус и т.д. и т.п.
        Всё это зависит от настроек сервера и от протокола.
        */
        console.log('[post http method]', res);
        /* метод history.replace() из библиотеки react-route удаляет "страницу" из стока страниц
        и заменяет её новой. Т.е. нельзя будет вернутся на неё нажав на кнопку "назад" в браузере.
        Если нужна возможность возвращения на предыдущею страницу, то нужно использовать
        метод history.push() this.props.history.push('/posts');
        */
        this.props.history.replace('/posts');
        // this.props.history.push('/posts');
      })
      .catch(() => {
        // Error handler should be here
      });
  }

  render() {
    return (
      <div className="NewPost">
        <h1>Add a Post</h1>
        <label htmlFor="title">
            Title
          <input
            type="text"
            id="title"
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          />
        </label>
        <label htmlFor="content">
          Content
          <textarea
            rows="4"
            id="content"
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
        </label>
        <label htmlFor="author">
          Author
          <select
            value={this.state.author}
            id="author"
            onChange={event => this.setState({ author: event.target.value })}
          >
            <option value="Max">Max</option>
            <option value="Manu">Manu</option>
          </select>
        </label>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

NewPost.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default NewPost;
