import axios from 'axios';

const API_BASE_URL = 'https://zeroshop.onrender.com'; 


const apiClient = axios.create({
  baseURL: API_BASE_URL,
});


function getStoredTokens() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  };
}


async function logoutUser() {
  const { refreshToken } = getStoredTokens();
  if (refreshToken) {
    try {
      await axios.post(`${API_BASE_URL}/user/logout/`, { refresh: refreshToken });
    } catch (error) {
      console.error("Error blacklisting token:", error);
    }
  }

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login'; 
}


apiClient.interceptors.request.use(
  async (config) => {
    let { accessToken } = getStoredTokens();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const { refreshToken } = getStoredTokens();

    
    if (error.response && error.response.status === 401 && refreshToken) {
      try {
        
        const refreshResponse = await axios.post(`${API_BASE_URL}/user/api/token/refresh/`, {
          refresh: refreshToken,
        });



        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(error.config); 
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        await logoutUser(); 
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
