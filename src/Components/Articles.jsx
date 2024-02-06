import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import Topic from "./Topic";
import ArticleList from "./ArticlesList.jsx";

function Articles() {
  const [articles, setArticles] = useState();
  const [selectedTopic, setSelectedTopic] = useState(" ");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedTopic) {
      fetchArticles().then((reponse) => {
        setArticles(reponse.data.articles);
        setLoading(false);
      });
    } else {
      fetchArticles(selectedTopic).then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      });
    }
  }, [selectedTopic]);

  return (
    <div>
      {loading ? (
        <p>Loading article...</p>
      ) : (
        <>
          <Topic setSelectedTopic={setSelectedTopic} />
          <ArticleList articles={articles} selectedTopic={selectedTopic} />
        </>
      )}
    </div>
  );
}

export default Articles;
