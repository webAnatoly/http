import React from 'react';
import PropTypes from 'prop-types';

import './Post.css';

const post = (props) => {
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

export default post;


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
