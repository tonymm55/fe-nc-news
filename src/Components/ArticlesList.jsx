import React from "react";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";

export default function ArticlesList({ selectedTopic }) {
  const [articles, setArticles] = useState();

  useEffect(() => {
    if (selectedTopic) {
      fetchArticles(selectedTopic).then((response) => {
        console.log(selectedTopic, "<<< Selected Topic (UseEffect)");
        setArticles(response.data.articles);
        console.log(response.data.articles);
      });
    }
  }, [selectedTopic]);

  return (
    <>
      <section>
        <h2>
          {selectedTopic === " "
            ? "All Articles Currently Displayed"
            : `All ${selectedTopic} Articles Displayed`}
        </h2>

        {articles &&
          articles.map((article) => (
            <div key={article.article_id}>
              <img src={article.article_img_url} />
              <p>Title: {article.title}</p>
              <p>Author: {article.author} </p>
              <p>Topic: {article.topic}</p>
              <p>Comments: {article.comment_count}</p>
              <p>Votes: {article.votes}</p>
            </div>
          ))}
      </section>
    </>
  );
}
