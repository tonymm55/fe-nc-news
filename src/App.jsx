import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

//------Components--------//
import Header from "./Components/Header";
import Home from "./Components/Home";
import Articles from "./Components/Articles";
import SingleArticleView from "./Components/SingleArticleView";
import NavigationBar from "./Components/NavigationBar";

function App() {
  return (
    <>
      <div className="App">
        <NavigationBar />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/articles/:articleId/comments"
            element={<SingleArticleView />}
          /> */}
          <Route
            path="/articles/singleView/:articleId"
            element={<SingleArticleView />}
          />
          <Route path="/articles/topic/:article_topic" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

//Endpoints--------//

// app.get("/api/topics", getAllTopics);
// app.get("/api/articles", getAllArticles);
// app.get("/api/articles/:article_id", getArticleById);
// app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
// app.post("/api/articles/:article_id/comments", postCommentsByArticleId);
// app.patch("/api/articles/:article_id", patchArticleByArticleId);
// app.delete("/api/comments/:comment_id", deleteCommentByCommentId);
// app.get("/api/users", getAllUsers);
