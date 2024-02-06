import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: `https://northcoders-news-ykvv.onrender.com/api`,
});

export const fetchArticles = async (topic) => {
  try {
    const response = await ncNewsAPI.get(`/articles?topic=${topic}`);
    console.log("FA GET request successful, response:", response);
    return response;
  } catch (error) {
    console.error("Error status: ", error.response.status);
    console.error("Error data: ", error.response.data);
    return await Promise.reject(error);
  }
};

export const fetchArticleById = async (articleId) => {
  try {
    const response = await ncNewsAPI.get(`/articles/${articleId}`);
    console.log("FAID GET request successful, response:", response);
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
    console.log("FCAID GET request successful, response:", response);
    return response;
  } catch (error) {
    console.error("Error status: ", error.response.status);
    console.error("Error data: ", error.response.data);
    return await Promise.reject(error);
  }
};

export default { fetchArticles, fetchArticleById, fetchCommentsByArticleId };

//Endpoints--------//

// app.get("/api/topics", getAllTopics);
// app.get("/api/articles", getAllArticles);
// app.get("/api/articles/:article_id", getArticleById);
// app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
// app.post("/api/articles/:article_id/comments", postCommentsByArticleId);
// app.patch("/api/articles/:article_id", patchArticleByArticleId);
// app.delete("/api/comments/:comment_id", deleteCommentByCommentId);
// app.get("/api/users", getAllUsers);
