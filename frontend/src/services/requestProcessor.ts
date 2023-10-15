import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:3000/",
=======
  baseURL: "http://localhost:3000",
>>>>>>> 4ea7f3557f8920e0f6c6ba470d43e5cf07ddc355
});

class apiClient<T> {
  
  endPoint: string;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  postData = (data: T | any, suffix = "") => {
    return axiosInstance.post(this.endPoint + suffix, data, { withCredentials: true });
  };

  updateData = (data: T, headers: any | undefined) => {
    return axiosInstance.put(this.endPoint, data, {
      headers,
      withCredentials: true
    });
  };

  deleteData = (suffix = "") => {
    return axiosInstance.delete(this.endPoint + suffix, {
      withCredentials: true
    });
  }

  getData = (suffix = "", params?: any) => {
    return axiosInstance.get<T>(this.endPoint + suffix, { withCredentials: true, params });
  };

  patchData = (data: T, suffix= "") => {
    return axiosInstance.patch<T>(this.endPoint + suffix, data, { withCredentials: true });
  };
}

export default apiClient;
