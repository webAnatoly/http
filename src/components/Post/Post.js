import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => {
  console.log('[Post]:', props);
  return (
    <article className="Post">
      <div
        onClick={props.clicked}
        role="button"
        onKeyDown={() => null}
        tabIndex="0"
        style={{
          width: '100%',
          height: '100%',
          padding: '16px',
        }}
      >
        <h1>{props.title}</h1>
        <div className="Info">
          <div className="Author">{props.author}</div>
          <div>{props.body}</div>
        </div>
      </div>
    </article>
  );
};

export default withRouter(post);
/* withRouter это Hight Order Component, его задача прокидывать пропсы от компонента Route
такие как match, history, location */


post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string,
  clicked: PropTypes.func,
};

post.defaultProps = {
  title: 'Title',
  body: 'Text',
  author: 'Author',
  clicked: () => null,
};
