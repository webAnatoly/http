import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPost: null,
    };
    this.isFullPostMounted = true; // читай комментарий [1]
  }

  componentDidMount() {
    console.log('FullPostDidMount');
    // if ((!this.state.loadedPost && this.props.match.params.id) ||
    //   (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {
    //   const url = `/posts/${this.props.match.params.id}`;
    //   axios.get(url)
    //     .then((res) => {
    //       this.setState({ loadedPost: res.data });
    //     })
    //     .catch(() => {
    //       // Error handler should be here
    //     });
    // }
    // Условие if мне кажется здесь уже не нужно. Оно было нужно в componentDidUpdate,
    // чтобы избежать цикличной отправки запроса.
    this.loadData();
  }
  componentDidUpdate() {
    const loadedId = this.state.loadedPost ? this.state.loadedPost.id : null;
    const newId = window.parseInt(this.props.match.params.id);
    if ((!this.state.loadedPost && newId) ||
    (this.state.loadedPost && loadedId !== newId)) {
      this.loadData();
    }
  }
  componentWillUnmount() {
    this.isFullPostMounted = false;
    /* Комментарий [1]
    Если ответ с сервера получен, когда компонент уже unmount, то будет ошибка
    Can't call setState (or forceUpdate) on an unmounted component.
    Поэтому нужно обрывать запрос, когда компонент unmount,
    либо делать проверку на наличие компонента. И выполнять setState только,
    если компонент отрендерен в DOM */
  }
  loadData() {
    const url = `/posts/${this.props.match.params.id}`;
    axios.get(url)
      .then((res) => {
        if (this.isFullPostMounted) { // читай комментарий [1]
          this.setState({ loadedPost: res.data });
        }
      })
      .catch(() => {
        // Error handler should be here
      });
  }
  deletePostHandler = () => {
    const url = `/posts/${this.props.match.params.id}`;
    axios.delete(url)
      .then(() => {
        // console.log(res);
      })
      .catch(() => {
        // Error handler
      });
  }
  render() {
    let fullPost = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      fullPost = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.loadedPost) {
      fullPost = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
          </div>
        </div>
      );
    }
    return fullPost;
  }
}

FullPost.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]),
  params: PropTypes.oneOfType([PropTypes.object]),
  id: PropTypes.string,
};

FullPost.defaultProps = {
  match: {},
  params: {},
  id: '',
};

export default FullPost;
