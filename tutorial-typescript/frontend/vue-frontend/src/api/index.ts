import store from "@/store";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { LocationQueryValue } from "vue-router";

// axios instance
const apiInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
});

// axios request interceptor
apiInstance.interceptors.request.use(
  (request) => {
    store.commit("loading/setLoading", true);

    const token = store.state.auth.token;
    if (token) {
      request.headers = {
        Authorization: `Token ${token}`,
      };
    }
    return request;
  },
  (error: AxiosError) => {
    store.commit("loading/setLoading", false);
    return Promise.reject(error);
  }
);

// axios response interceptor
apiInstance.interceptors.response.use(
  (response) => {
    store.commit("loading/setLoading", false);
    return response;
  },
  (error: AxiosError) => {
    store.commit("loading/setLoading", false);
    if (error.response?.status === 500)
      toast({
        message: "Something went wrong. Please try again.",
        type: "is-danger",
      });
    return Promise.reject(error);
  }
);

////////////////////////////////////
// APIs
/////////////////////////////////////
export const getLatestProductsApi = async () => {
  const response = await apiInstance.get("/api/products/latest");
  return response.data;
};

export const getProductApi = async (
  categorySlug: string | string[],
  productSlug: string | string[]
) => {
  const response = await apiInstance.get(
    `api/products/${categorySlug}/${productSlug}`
  );
  return response.data;
};

export const getCategoryApi = async (categorySlug: string | string[]) => {
  const response = await apiInstance.get(`api/products/${categorySlug}`);
  return response.data;
};

export const searchProductsApi = async (
  query: LocationQueryValue | LocationQueryValue[]
) => {
  const response = await apiInstance.post(`api/products/`, { query: query });
  return response.data;
};

export const signUp = async (form: { username: string; password: string }) => {
  await apiInstance.post("/api/auth/users/", form);
};

export default apiInstance;
