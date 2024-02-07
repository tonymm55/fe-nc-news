import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../../api";
import Topic from "./Topic";
import ArticlesList from "./ArticlesList.jsx";

function Articles() {
  const { article_topic } = useParams();
  console.log(article_topic, "<<< article_topic");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log(article_topic, "<<< article_topic");
    const topicToFetch = article_topic || undefined;
    console.log(topicToFetch, "<<< topicToFetch");
    fetchArticles(topicToFetch)
      .then((response) => {
        console.log(response, "<<< Articles List response");
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        console.error("Error details:", error.response);
        setLoading(false);
      });

    setSelectedTopic(topicToFetch);
  }, [article_topic]);

  return (
    <div>
      {loading ? (
        <p>Loading Articles...</p>
      ) : (
        <>
          <Topic />
          <ArticlesList
            articles={articles}
            selectedTopic={selectedTopic || "All Articles"}
          />
        </>
      )}
    </div>
  );
}

export default Articles;
