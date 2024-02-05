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
        console.log(selectedTopic, "<<< Selected Topic (Articles)");
        setArticles(response.data.articles);
      });
    }
  }, [selectedTopic]);

  return (
    <div>
      <Topic setSelectedTopic={setSelectedTopic} />
      <ArticleList articles={articles} selectedTopic={selectedTopic} />
    </div>
  );
}

export default Articles;
