import axiosInstance from './index';

//일과 상세 취득
export const getWorkInfoApi = async () => {
  try {
    const response = await axiosInstance.get('/workInfo/getWorkInfo');
    return response.data;
  } catch(error) {
    console.error('Failed to fetch work info:', error);
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

//Todo list  취득
export const getTodoListApi = async () => {
  try {
    const response = await axiosInstance.get('/todo/getWorkTodo');
    return response.data;
  } catch(error) {
    console.error('Failed to fetch todo list', error);
    throw error;
  }
}

//Todo 등록
export const addTodoApi = async (submittedTodo) => {
  try {
    const response = await axiosInstance.post('/todo/addTodo', submittedTodo);
    return response.data;
  } catch (error) {
    console.error("Failed to install todo:", error);
  }
}

//Todo 삭제
export const delTodoApi = async (todoSeq) => {
  const param = {
    workTodoSeq : todoSeq
  };
  try {
    const response = await axiosInstance.post('/todo/delTodo', param);
    return response.data;    
  } catch (error) {
    console.error("Failed to delete todo:", error)
  }
}

//Todo 수정
export const setTodoApi = async (submittedInfo) => {
  try {
    const response = await axiosInstance.post('/todo/setTodo', submittedInfo);
    return response.data;
  } catch (error) {
    console.error('Failed to modfy todo:', error);
    throw error;
  }
}