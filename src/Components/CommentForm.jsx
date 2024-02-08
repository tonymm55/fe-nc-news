import React, { useState } from "react";
import { postArticleComment } from "../../api";

function CommentForm({ articleId }) {
  console.log({ articleId }, "<<< articleId");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const username = "tickle122";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await postArticleComment(articleId, username, body);
      console.log(username, body, "<<< username & body");
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
    <form onSubmit={handleSubmit}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Comments..."
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default CommentForm;
