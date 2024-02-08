import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";

export default function ArticlesList() {
  const { article_topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticles(article_topic)
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching articles >>>", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_topic]);

  return (
    <>
      <section>
        <h2>
          {article_topic === undefined || null
            ? "All Articles Displayed"
            : `All ${article_topic?.charAt(0)?.toUpperCase()}${
                article_topic?.slice(1) || ""
              } Articles Displayed`}
        </h2>
      </section>
      <section className="articles">
        {loading ? (
          <p>Loading Articles...</p>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        )}
      </section>
    </>
  );
}
