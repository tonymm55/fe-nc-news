import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = (props) => {
  let article = props.article;

  const formatDate = (dateStr) => {
    return dateStr.split("T")[0];
  };
  console.log(`Article ID: ${article.article_id}, Votes: ${article.votes}`);

  return (
    <div key={article.article_id}>
      <Link to={`/articles/singleView/${article.article_id}`}>
        <img src={article.article_img_url} alt={article.title} />
        <p>Title: {article.title}</p>
        <p>Author: {article.author} </p>
        <p>Topic: {article.topic}</p>
        <p>Comments: {article.comment_count}</p>
        <p>Votes: {article.votes}</p>
        <p>Date: {formatDate(article.created_at)}</p>
      </Link>
    </div>
  );
};

export default ArticleCard;
