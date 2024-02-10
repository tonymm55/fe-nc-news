import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import { useParams, useSearchParams } from "react-router-dom";

export default function ArticlesList() {
  const { article_topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    fetchArticles(
      article_topic,
      searchParams.get("sort_by"),
      searchParams.get("order")
    )
      .then((response) => {
        let sortedArticles = response.data.articles;

        if (searchParams.get("sort_by") === "comment_count") {
          sortedArticles = sortedArticles.sort((a, b) =>
            searchParams.get("order") === "ASC"
              ? a.comment_count - b.comment_count
              : b.comment_count - a.comment_count
          );
        } else if (searchParams.get("sort_by") === "created_at") {
          sortedArticles = sortedArticles.sort((a, b) =>
            searchParams.get("order") === "ASC"
              ? new Date(a.created_at) - new Date(b.created_at)
              : new Date(b.created_at) - new Date(a.created_at)
          );
        } else {
          sortedArticles = sortedArticles.sort((a, b) =>
            searchParams.get("order") === "ASC"
              ? a.votes - b.votes
              : b.votes - a.votes
          );
        }
        setArticles(sortedArticles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles: ", error);
        setLoading(false);
      });
  }, [article_topic, searchParams]);

  const handleSort = (sortType) => {
    let newOrder = "ASC";
    if (
      searchParams.get("sort_by") === sortType &&
      searchParams.get("order") === "ASC"
    ) {
      newOrder = "DESC";
    }
    console.log(`Sorting by: ${sortType}, New Order: ${newOrder}`);
    setSearchParams({ sort_by: sortType, order: newOrder });
  };

  useEffect(() => {
    console.log("Updated search params useEffect >>>", searchParams.toString());
  }, [searchParams]);

  return (
    <>
      <section>
        <h2>
          {article_topic === undefined || article_topic === null
            ? "All Articles Displayed"
            : `All ${article_topic?.charAt(0)?.toUpperCase()}${
                article_topic?.slice(1) || ""
              } Articles Displayed`}
        </h2>
        <button onClick={() => handleSort("created_at")}>
          Sort by Date{" "}
          {searchParams.get("sort_by") === "created_at" &&
            (searchParams.get("order") === "ASC" ? "⬇️" : "⬆️")}
        </button>
        <button onClick={() => handleSort("comment_count")}>
          Sort by Comment Count{" "}
          {searchParams.get("sort_by") === "comment_count" &&
            (searchParams.get("order") === "ASC" ? "⬇️" : "⬆️")}
        </button>
        <button onClick={() => handleSort("votes")}>
          Sort by Votes{" "}
          {searchParams.get("sort_by") === "votes" &&
            (searchParams.get("order") === "ASC" ? "⬇️" : "⬆️")}
        </button>
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
