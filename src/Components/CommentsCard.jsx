import React from "react";
import { Link } from "react-router-dom";

const CommentsCard = (props) => {
  let comment = props.comment;
  console.log(comment, "<<<props.comment");
  return (
    <div key={comment.comment_id}>
      <Link to={`/articles/${comment.article_id}/comments`}>
        <section className="comments-body">
          <p className="comment-header">{`Comment ID: ${comment.comment_id}: ${comment.author}`}</p>
          <p>{comment.body}</p>
        </section>
      </Link>
    </div>
  );
};

export default CommentsCard;
