import React from "react";
import { Link } from "react-router-dom";

const CommentsCard = ({
  comment,
  username,
  onDeleteComment,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    try {
      await onDeleteComment(comment.comment_id);
      onDeleteSuccess("Your comment has been deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <Link to={`/articles/${comment.article_id}/comments`}>
        <section className="comments-body">
          <p className="comment-header">{`Comment Id: ${comment.comment_id}: ${comment.author}`}</p>
          <p>{comment.body}</p>
        </section>
      </Link>
      {username === comment.author && (
        <button onClick={handleDelete}>Delete Comment</button>
      )}
    </div>
  );
};

export default CommentsCard;
