import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import Topic from "./Topic";
import ArticleList from "./ArticlesList.jsx";

function Articles() {
  const [articles, setArticles] = useState();
  const [selectedTopic, setSelectedTopic] = useState(" ");

  useEffect(() => {
    if (selectedTopic) {
      fetchArticles().then((reponse) => {
        setArticles(reponse.data.articles);
      });
    } else {
      fetchArticles(selectedTopic).then((response) => {
        setArticles(response.data.articles);
      });
    }
  }, [selectedTopic]);

  return (
    <>
      <Topic setSelectedTopic={setSelectedTopic} />
      <ArticleList articles={articles} selectedTopic={selectedTopic} />
    </>
  );
}

export default Articles;
