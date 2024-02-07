import React from "react";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";

export default function ArticlesList() {
  const { article_topic } = useParams();
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticles()
      .then((response) => {
        console.log(response, "<<<Articles List response");
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_topic]);

  return (
    <>
      <section>
        <h2>
          {article_topic === " "
            ? "All Articles Displayed"
            : `All ${article_topic} Articles Displayed`}
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
