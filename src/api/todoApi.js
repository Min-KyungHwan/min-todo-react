import axiosInstance from './index';

export const getWorkInfo = async () => {
  try {
    const response = await axiosInstance.get('/getWorkInfo');
    return response.data;
  } catch(error) {
    console.error('Failed to fetch user list:', error);
    throw error;
  }
}