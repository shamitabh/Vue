import router from "@/router";
import store from "@/store";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { LocationQueryValue } from "vue-router";

// axios instance
const apiInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: { "Content-Type": "application/json" },
});

// axios request interceptor
apiInstance.interceptors.request.use(
  (request) => {
    if (!request.url!.endsWith("refresh")) {
      store.commit("loading/setLoading", true);
    }
    // const token = store.state.auth.token;
    // if (token) {
    //   if (request.url!.endsWith("api/products/latest")) {
    //     request.headers!.Authorization = `Bearer ${token.access}`;
    //   }
    // }
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
  async (error: AxiosError) => {
    store.commit("loading/setLoading", false);
    let originalRequest = error.config;
    switch (error.response?.status) {
      case 401:
        switch ((error.response?.data as { detail: string }).detail) {
          case "Given token not valid for any token type":
            await store.dispatch("auth/refresh");
            return apiInstance(originalRequest);
          case "Token is blacklisted":
          case "Authentication credentials were not provided.":
            store.commit("auth/unsetAuth");
            toast({
              message: "Session expired. Please log in again.",
              type: "is-danger",
            });
            router.push({ name: "login" });
            break;
        }
        break;
      case 500:
        toast({
          message: "Something went wrong. Please try again.",
          type: "is-danger",
        });
        break;
    }
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

export const getCategoryApi = async (categorySlug: string | undefined) => {
  const response = await apiInstance.get(`api/products/${categorySlug}`);
  return response.data;
};

export const searchProductsApi = async (
  query: LocationQueryValue | LocationQueryValue[]
) => {
  const response = await apiInstance.post(`api/products/`, { query: query });
  return response.data;
};

export const register = async (form: {
  username: string;
  password: string;
}) => {
  await apiInstance.post("/api/account/signup", form);
};

export default apiInstance;
