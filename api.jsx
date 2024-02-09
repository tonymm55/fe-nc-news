import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: `https://northcoders-news-ykvv.onrender.com/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

//northcoders-news-ykvv.onrender.com/api/articles?topic=football
export const fetchArticles = async (article_topic) => {
  try {
    const response = await ncNewsAPI.get(`/articles`, {
      params: {
        topic: article_topic,
      },
    });
    return response;
  } catch (error) {
    console.error("Error status: ", error.response.status);
    console.error("Error data: ", error.response.data);
    return Promise.reject(error);
  }
};

export const fetchArticleById = async (articleId) => {
  try {
    const response = await ncNewsAPI.get(`/articles/${articleId}`);
    return response;
  } catch (error) {
    console.error("Error status: ", error.response.status);
    console.error("Error data: ", error.response.data);
    return await Promise.reject(error);
  }
};

export const fetchCommentsByArticleId = async (articleId) => {
  try {
    const response = await ncNewsAPI.get(`/articles/${articleId}/comments`);
    return response;
  } catch (error) {
    console.error("Error status: ", error.response.status);
    console.error("Error data: ", error.response.data);
    return await Promise.reject(error);
  }
};

export const patchArticleVotes = async (articleId, incVotes) => {
  try {
    const response = await ncNewsAPI.patch(`/articles/${articleId}`, {
      inc_votes: incVotes,
    });
    return response;
  } catch (error) {
    console.error("Error status: ", error.response.status);
    console.error("Error data: ", error.response.data);
    return await Promise.reject(error);
  }
};

// app.post("/api/articles/:article_id/comments", postCommentsByArticleId);
// northcoders-news-ykvv.onrender.com/api/articles/2/comments

export const postArticleComment = async (articleId, username, body) => {
  console.log(
    {
      username,
      body,
    },
    "<<< Request body"
  );
  try {
    if (!articleId || !body || !username) {
      console.error("One or more fields are empty or undefined");
      return Promise.reject("One or more fields are empty or undefined");
    }

    const response = await ncNewsAPI.post(`/articles/${articleId}/comments`, {
      username,
      body,
    });
    return response;
  } catch (error) {
    console.error("Error occurred while posting article >>>", error);
    console.error(
      "Error status:",
      error.response ? error.response.status : null
    );
    console.error("Error data:", error.response ? error.response.data : null);
    throw error;
  }
};
