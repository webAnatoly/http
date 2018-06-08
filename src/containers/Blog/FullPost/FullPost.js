import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
  }
  componentDidMount() {
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
    const url = `/posts/${this.props.match.params.id}`;
    axios.get(url)
      .then((res) => {
        this.setState({ loadedPost: res.data });
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
    console.log('[FullPostComponent]:', this.props.match.params.id);
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
