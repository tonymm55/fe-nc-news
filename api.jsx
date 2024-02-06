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
