import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: `https://northcoders-news-ykvv.onrender.com/api`,
});

export const fetchArticles = async (topic) => {
  try {
    const response = await ncNewsAPI.get(`/articles?topic=${topic}`);
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

export default {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  patchArticleVotes,
};
