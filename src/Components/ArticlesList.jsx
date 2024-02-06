import React from "react";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import ArticleCard from "./ArticleCard";

export default function ArticlesList({ selectedTopic }) {
  const [articles, setArticles] = useState();

  useEffect(() => {
    if (selectedTopic) {
      fetchArticles(selectedTopic).then((response) => {
        setArticles(response.data.articles);
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
      </section>
      <section className="articles">
        {articles &&
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
      </section>
    </>
  );
}
