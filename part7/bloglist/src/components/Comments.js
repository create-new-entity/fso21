import React from 'react';

const Comments = ({ comments }) => {
  if(!comments || !comments.length) return null;
  return (
    <div>
      <h2>comments</h2>
      <ul>
        {
          comments.map(commentObj => <li key={commentObj.id}>{commentObj.comment}</li>)
        }
      </ul>
    </div>
  );
};

export default Comments;