import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import Topic from "./Topic";
import ArticlesList from "./ArticlesList.jsx";

function Articles() {
  const { article_topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    setLoading(true);
    const topicToFetch = article_topic || null;
    fetchArticles(topicToFetch)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles: ", error);
        setLoading(false);
      });

    setSelectedTopic(topicToFetch);
  }, [article_topic]);

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
