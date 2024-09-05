import axios from 'axios'

const Axios = axios.create({
    baseURL: 'https://swep-cms.onrender.com/api/v1',
    timeout: 8000
})

export const setAxiosToken = (token: string | null) => {
    if (token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete Axios.defaults.headers.common['Authorization'];
    }
};

Axios.interceptors.response.use(
    async (response) => response,
    (error) => Promise.reject(error?.response?.data?.message || error?.response?.data?.error || error?.response?.data || error?.response || error?.message || error)
);

export default Axios