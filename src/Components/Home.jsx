import React from "react";
import { fetchArticles } from "../../api";
import { useState, useEffect } from "react";
import Articles from "./Articles";

function Home() {
  return (
    <div>
      <Articles />
    </div>
  );
}

export default Home;
