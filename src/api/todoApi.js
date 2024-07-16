import axiosInstance from './index';

//일과 상세 취득
export const getWorkInfoApi = async () => {
  try {
    const response = await axiosInstance.get('/workInfo/getWorkInfo');
    return response.data;
  } catch(error) {
    console.error('Failed to fetch workInfo:', error);
    throw error;
  }
}

//일과 상세 수정
export const setWorkInfoApi = async (submittedInfo) => {
  try {
    const response = await axiosInstance.post('/workInfo/setWorkInfo', submittedInfo);
    return response.data;
  } catch (error) {
    console.error('Failed to modfy work info:', error);
    throw error;
  }
}

//일과 상세 등록
export const addWorkInfoApi = async (submittedInfo) => {
  try {
    const response = await axiosInstance.post('/workInfo/addWorkInfo', submittedInfo);
    return response.data;
  } catch (error) {
    console.error('Failed to install work info:', error);
    throw error;
  }
}