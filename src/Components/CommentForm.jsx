import React, { useState } from "react";

function CommentForm({ articleId, onCommentSubmit, username }) {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const newComment = {
        username: username, // temporary solution until I've added authentication!
        body: body,
      };

      await onCommentSubmit(newComment);
      setSuccessMessage("Your comment has been posted successfully!");
      setBody("");
      setIsSubmitting(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      setErrorMessage(
        "There was an error posting your comment. Please try again later."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        className="comment-field"
        name="body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Comments..."
        required
      />
      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default CommentForm;
