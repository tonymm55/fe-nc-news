import { useParams, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import Topic from "./Topic";
import ArticlesList from "./ArticlesList.jsx";

function Articles() {
  const { article_topic } = useParams();
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    setLoading(true);
    const topicToFetch = article_topic || null;
    const sortBy = searchParams.get("sort_by");
    const order = searchParams.get("order");
    fetchArticles(topicToFetch, sortBy, order)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles: ", error);
        setLoading(false);
      });

    setSelectedTopic(topicToFetch);
  }, [article_topic, searchParams]);

  return (
    <div>
      <Topic onTopicSelect={setSelectedTopic} />
      {loading ? (
        <p>Loading Articles...</p>
      ) : (
        <ArticlesList articles={articles} selectedTopic={selectedTopic} />
      )}
    </div>
  );
}

export default Articles;

// useEffect(() => {
//   getArticles({ topic: topic, sort_by: sort, order: order })
//     .then((response) => {
//       setAllArticles(response);
//       setLoading(false);
//     })
//     .catch((err) =>
//
