import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  patchArticleVotes,
  postArticleComment,
  deleteCommentByCommentId,
} from "../../api";

import CommentsCard from "./CommentsCard";
import CommentForm from "./CommentForm";

function SingleArticleView() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [hasComments, setHasComments] = useState(false);
  const [refetchComments, setRefetchComments] = useState(false);
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState("");
  const commentsRef = useRef(null);

  const username = "tickle122";

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
          console.error("Failed to fetch article: ", error);
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
            console.error("Failed to fetch comments: ", error);
          }
        });
    }
  }, [articleId]);

  const handleNewComment = async (newComment) => {
    const tempId = Date.now().toString();
    const timestamp = Date.now();
    const newCommentObj = {
      ...newComment,
      comment_id: tempId,
      timestamp: timestamp,
    };
    setComments((prevComments) => [newCommentObj, ...prevComments]);

    try {
      const response = await postArticleComment(
        articleId,
        newComment.username,
        newComment.body
      );

      if (response.status === 201 && response.data) {
        const fullCommentObj = {
          comment_id: tempId,
          author: newComment.username,
          body: response.data.postedComment,
        };

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.comment_id === tempId ? fullCommentObj : comment
          )
        );
      } else {
        console.error(`Failed to post comment: Status: ${response.status}`);

        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== tempId)
        );
      }
    } catch (error) {
      console.error("An error occurred while posting comment: ", error);

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== tempId)
      );
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
          console.error("Failed to update votes: ", error);
          setArticle((prevArticle) => ({
            ...prevArticle,
            votes: prevArticle.votes - direction,
          }));
        });
    }
  };

  useEffect(() => {
    if (refetchComments) {
      fetchCommentsByArticleId(articleId)
        .then((response) => {
          if (response && response.data && response.data.comments.length > 0) {
            setComments(response.data.comments);
            setHasComments(true);
          } else {
            setHasComments(false);
          }
          setRefetchComments(false);
        })
        .catch((error) => {
          console.error("Failed to fetch comments: ", error);
        });
    }
  }, [refetchComments, articleId]);

  const onDeleteComment = async (commentId) => {
    try {
      await deleteCommentByCommentId(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
      setRefetchComments(true);
    } catch (error) {
      console.error("Failed to delete comment: ", error);
    }
  };

  const onDeleteSuccess = (message) => {
    setDeleteSuccessMsg(message);
    setTimeout(() => setDeleteSuccessMsg(""), 5000);
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
                <CommentForm
                  articleId={articleId}
                  onCommentSubmit={handleNewComment}
                  username={username}
                />
                {deleteSuccessMsg && <p>{deleteSuccessMsg}</p>}
                {hasComments ? (
                  comments.map((comment, index) => (
                    <CommentsCard
                      key={comment.comment_id || index}
                      comment={comment}
                      username={username}
                      onDeleteComment={onDeleteComment}
                      onDeleteSuccess={onDeleteSuccess}
                    />
                  ))
                ) : (
                  <p>This article has no comments - Be the first!</p>
                )}
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SingleArticleView;
