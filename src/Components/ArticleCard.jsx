import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = (props) => {
  let article = props.article;

  return (
    <div key={article.article_id}>
      <Link to={`/articles/${article.article_id}`}>
        <img src={article.article_img_url} alt={article.title} />
        <p>Title: {article.title}</p>
        <p>Author: {article.author} </p>
        <p>Topic: {article.topic}</p>
        <p>Comments: {article.comment_count}</p>
        <p>Votes: {article.votes}</p>
      </Link>
    </div>
  );
};

export default ArticleCard;
