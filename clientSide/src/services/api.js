import axios from "axios";
import { toast } from "react-toastify";

//1. create a axios instance for the api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//2. axios response interceptor (throw a toaster errors EARLY?)
api.interceptors.response.use(null, (error) => {
  // Setting Expected Error Range: If it is a error from 400 - 500
   if (error.response) {
     const expectedError =
       error.response &&
       error.response.status >= 400 &&
       error.response.status &&
       error.response.status < 500;

     if (!expectedError) {
       // NOTE: We could also implement a logging system for errors here
       console.log(`Interceptors - ${error}`);
       toast.error("Unexpected Error");
     }
   } else {
     // STANDARDISED: By creating uniform error responses, like our backend, we can standardise our errors on the front end
     console.log(`${error?.response.data}`);
   }

  // Function Return: As we a intercepting an ERROR we want to make sure we return a rejected promise
  return Promise.reject(error);
});

//3. setting default configs (header token)

export function setHeaderToken() {
  let token = localStorage.getItem("userToken");
  if (token) {
  const parsedToken = JSON.parse(token);
  const accessToken = parsedToken.token;

  if (accessToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else delete api.defaults.headers.common["Authorization"];}
  else return;
}

setHeaderToken();

export default api;
