import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: `https://northcoders-news-ykvv.onrender.com/api`,
});

export const fetchArticles = async (topic) => {
  try {
    const response = await ncNewsAPI.get(`/articles?topic=${topic}`);
    console.log("POST request successful, response:", response);
    return response;
  } catch (error) {
    console.error("Error status: ", error.response.status);
    console.error("Error data: ", error.response.data);
    return await Promise.reject(error);
  }
};

export default { fetchArticles };
