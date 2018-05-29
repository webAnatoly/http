import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
  }
  componentDidUpdate() {
    if ((!this.state.loadedPost && this.props.id) ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
      const url = `/posts/${this.props.id}`;
      axios.get(url)
        .then((res) => {
          this.setState({ loadedPost: res.data });
        })
        .catch(() => {
          // Error handler should be here
        });
    }
  }
  deletePostHandler = () => {
    const url = `/posts/${this.props.id}`;
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
    if (this.props.id) {
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
  id: PropTypes.number,
};

FullPost.defaultProps = {
  id: null,
};

export default FullPost;
