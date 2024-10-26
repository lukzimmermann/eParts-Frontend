import axios from "axios";

export enum Method {
    GET,
    POST,
    PUT,
    DELETE,
}

export async function apiCall<T>(command: Method, url: string, payload: object) {
    let data: T | undefined = undefined;
    let error: string | undefined = undefined;
    let loading: boolean = false;

    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_ADDRESS + "/",
        headers: {
          "Content-Type": "application/json",
        },
      });
      instance.defaults.withCredentials = true;
      instance.interceptors.response.use(
        (res) => {
          return res;
        },
        async (err) => {
          return Promise.reject(err);
        },
      );

    switch (command) {
      case Method.GET:
        await instance
          .get(url, payload)
          .then((response) => (data = response.data))
          .catch((responseError) => (error = responseError))
          .finally(() => (loading = false));
        break;
      case Method.POST:
        await instance
          .post(url, payload)
          .then((response) => {
            data = response.data;
          })
          .catch((responseError) => (error = responseError))
          .finally(() => (loading = false));
        break;
      case Method.PUT:
        await instance
          .put(url, payload)
          .then((response) => (data = response.data))
          .catch((responseError) => (error = responseError))
          .finally(() => (loading = false));
        break;
      case Method.DELETE:
        await instance
          .delete(url, payload)
          .then((response) => (data = response.data))
          .catch((responseError) => (error = responseError))
          .finally(() => (loading = false));
        break;
      default:
        loading = false;
        break;
    }
    return { data, error, loading };
  }