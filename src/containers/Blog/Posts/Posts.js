import React from 'react';
// import PropTypes from 'prop-types';
import axios from '../../../axiosInstance';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: [],
      // selectedPostId: null,
      getPostsError: false,
      getUsersError: false,
    };
  }
  componentDidMount() {
    axios.get('/posts')
      .then((res) => {
        const somePosts = res.data.splice(0, 12);
        this.setState({ posts: somePosts });
      })
      .catch(() => {
        this.setState({ getPostsError: true });
      });
    axios.get('/users')
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch(() => {
        this.setState({ getUsersError: true });
      });
  }
  postSelectedHandler = () => {
    // this.setState({ selectedPostId: id });
  }
  render() {
    let posts = <Post />;
    if (this.state.getPostsError) {
      posts = <Post title="Error" author="" body="Some error occured" />;
    }
    if (this.state.posts.length > 0) {
      posts = this.state.posts.map((post) => {
        let author = 'Author';
        if (this.state.users.length > 0) {
          author = this.state.users[post.userId - 1].username;
        }
        if (this.state.getUsersError) { author = 'Error in getting author'; }
        return (
          <Post
            title={post.title}
            body={post.body}
            key={post.id}
            author={author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return (
      <section className="Posts">
        {posts}
      </section>
    );
  }
}


// Posts.propTypes = {

// };

// Posts.defaultProps = {

// };

export default Posts;
