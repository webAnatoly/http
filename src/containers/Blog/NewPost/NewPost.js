import React, { Component } from 'react';
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
    axios.post('/posts', myData) // axios сам конвертирует объект в JSON формат
      .then(() => {
        // console.log(res);
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

export default NewPost;
