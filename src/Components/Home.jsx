import React from "react";
import { fetchArticles } from "../../api";
import { useState, useEffect } from "react";
import Articles from "./Articles";

function Home() {
  // const [articles, setArticles] = useState();
  // const [selectedTopic, setSelectedTopic] = useState(" ");

  // useEffect(() => {
  //   if (selectedTopic) {
  //     fetchArticles().then((reponse) => {
  //       setArticles(reponse.data.articles);
  //     });
  //   } else {
  //     fetchArticles(selectedTopic).then((response) => {
  //       console.log(selectedTopic, "<<< Selected Topic (Articles)");
  //       setArticles(response.data.articles);
  //     });
  //   }
  // }, [selectedTopic]);

  return (
    <div>
      <Articles />
      {/* <Topic setSelectedTopic={setSelectedTopic} />
      <ArticleList articles={articles} selectedTopic={selectedTopic} /> */}
    </div>
  );
}

export default Home;
