import React from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  patchArticleVotes,
  postArticleComment,
} from "../../api";
import { useState, useEffect, useRef } from "react";
import CommentsCard from "./CommentsCard";
import CommentForm from "./CommentForm";

function SingleArticleView() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [hasComments, setHasComments] = useState(false);
  const commentsRef = useRef(null);

  useEffect(() => {
    if (articleId) {
      setLoading(true);
      fetchArticleById(articleId)
        .then((response) => {
          if (response && response.data) {
            setArticle(response.data.article);
          } else {
            console.error("No article data in response");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch article >>>", error);
          setLoading(false);
        });

      fetchCommentsByArticleId(articleId)
        .then((response) => {
          if (response && response.data && response.data.comments.length > 0) {
            setComments(response.data.comments);
            setHasComments(true);
          } else {
            setHasComments(false);
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setHasComments(false);
          } else {
            console.error("Failed to fetch comments >>>", error);
          }
        });
    }
  }, [articleId]);

  const handleNewComment = async (newComment) => {
    try {
      const response = await postArticleComment(
        articleId,
        newComment.username,
        newComment.body
      );
      if (response.status === 201) {
        setComments((prevComments) => [...prevComments, response.data]);
      } else {
        console.error(`Failed to post comment: Status ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred while posting comment >>>", error);
    }
  };

  // Show article comments onClick event below page
  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (!showComments && commentsRef.current) {
      setTimeout(() => {
        commentsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Optmisitic Rendering before Patch Request
  const handleVoteChange = (direction) => {
    if (article && typeof article.votes === "number") {
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes + direction,
      }));

      patchArticleVotes(articleId, direction)
        .then((response) => {
          if (
            response.data &&
            typeof response.data.article.votes === "number"
          ) {
            setArticle((prevArticle) => ({
              ...prevArticle,
              votes: response.data.article.votes,
            }));
          }
        })
        .catch((error) => {
          console.error("Failed to update votes >>>", error);
          setArticle((prevArticle) => ({
            ...prevArticle,
            votes: prevArticle.votes - direction,
          }));
        });
    }
  };

  return (
    <div className="single-article-view">
      {loading ? (
        <p>Loading article...</p>
      ) : article ? (
        <>
          <h3>r/{article.topic}</h3>
          <h1>{article.title}</h1>
          <p>Article by: {article.author} </p>
          <img src={article.article_img_url} alt={article.title} />
          <p>{article.body}</p>
          <div className="vote-container">
            <p className="votes">Vote Count: {article.votes}</p>
            <button onClick={() => handleVoteChange(1)}>Vote ⬆</button>
            <button onClick={() => handleVoteChange(-1)}>Vote ⬇</button>
          </div>
          <p className="comments">💬 Comment Count: {article.comment_count}</p>
          <button onClick={handleToggleComments}>Click for Comments</button>

          <div ref={commentsRef}>
            {showComments && (
              <>
                {hasComments ? (
                  comments.map((comment) => (
                    <CommentsCard key={comment.comment_id} comment={comment} />
                  ))
                ) : (
                  <p>This article has no comments - Be the first!</p>
                )}
                <CommentForm
                  articleId={articleId}
                  onCommentSubmit={handleNewComment}
                />
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SingleArticleView;
