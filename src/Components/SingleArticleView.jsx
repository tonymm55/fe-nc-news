import React from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../api";
import { useState, useEffect } from "react";

function SingleArticleView() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (articleId) {
      fetchArticleById(articleId)
        .then((response) => {
          if (response && response.data) {
            setArticle(response.data.article);
          } else {
            console.error("No data in response");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch article:", error);
        });
    }
  }, [articleId]);

  return (
    <div className="single-article-view">
      {article && (
        <>
          <h3>r/{article.topic}</h3>
          <h1>{article.title}</h1>
          <p>{article.author} </p>
          <img src={article.article_img_url} alt={article.title} />
          <p>{article.body}</p>
          <p className="votes">Votes: ⬆️ {article.votes} ⬇️</p>
          <p className="comments">Comments: 💬 {article.comment_count}</p>
        </>
      )}
    </div>
  );
}

export default SingleArticleView;
