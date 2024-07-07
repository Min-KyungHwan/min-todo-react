import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.exaple.com', // 기본 URL 설정
  timeout: 1000, // 요청 타임아웃 설정
  headers: {'X-Custom-Header': 'foobar'}
});

// 요청 인터셉터
instance.interceptors.request.use(function (config) {
  // 요청 보내기 전에 할 작업
  return config;
}, function (error) {
  // 요청 에러가 발생했을 때 할 작업
  return Promise.reject(error);
});

// 응답 인터셉터
instance.interceptors.response.use(function (response) {
  // 응답 데이터를 가공
  return response;
}, function (error) {
  // 응답 에러가 발생했을 때 할 작업
  return Promise.reject(error);
});

export default instance;