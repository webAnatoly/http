import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import axiosInstance from '../../../axiosInstance';
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
    this.isPostsMounted = true;
  }
  componentDidMount() {
    axiosInstance.get('/posts')
      .then((res) => {
        const somePosts = res.data.splice(0, 12);
        if (this.isPostsMounted) {
          /* "Если на момент получаения ответа сервера компонент" существует в DOM,
          то можно менять его state */
          this.setState({ posts: somePosts });
        }
      })
      .catch(() => {
        this.setState(() => ({ getPostsError: true }));
      });
    axiosInstance.get('/users')
      .then((res) => {
        if (this.isPostsMounted) {
          /* "Если на момент получаения ответа сервера компонент" существует в DOM,
          то можно менять его state */
          this.setState({ users: res.data });
        }
      })
      .catch(() => {
        this.setState(() => ({ getUsersError: true }));
      });
  }
  componentWillUnmount() {
    this.isPostsMounted = false;
  }
  postSelectedHandler = (id) => {
    console.log('clickHandler', id);
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
          <Link to={`/${post.id}`} key={post.id}>
            <Post
              title={post.title}
              body={post.body}
              author={author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
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
