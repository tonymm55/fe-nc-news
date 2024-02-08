import React, { useState } from "react";

function CommentForm({ onCommentSubmit }) {
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
        username: "tickle122", // temporary solution until I've added authentication!
        body: body,
      };
      await onCommentSubmit(newComment);
      setSuccessMessage("Your comment has been posted successfully!");
      setBody("");
    } catch (error) {
      setErrorMessage(
        "There was an error posting your comment. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        className="comment-field"
        name="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
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
