import React from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId } from "../../api";
import { useState, useEffect, useRef } from "react";
import CommentsCard from "./CommentsCard";

function SingleArticleView() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
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
          console.error("Failed to fetch article:", error);
          setLoading(false);
        });

      fetchCommentsByArticleId(articleId)
        .then((response) => {
          if (response && response.data) {
            setComments(response.data.comments);
          } else {
            console.error("No comments data in response");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch comments:", error);
        });
    }
  }, [articleId]);

  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (!showComments && commentsRef.current) {
      setTimeout(() => {
        commentsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
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
          <p className="votes">Votes: ⬆️ {article.votes} ⬇️</p>
          <p className="comments">Comment Count: 💬 {article.comment_count}</p>
          <button onClick={handleToggleComments}>Click for Comments</button>
          <div ref={commentsRef}>
            {showComments &&
              comments.map((comment) => (
                <CommentsCard key={comment.comment_id} comment={comment} />
              ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SingleArticleView;
