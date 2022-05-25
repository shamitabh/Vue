import store from "@/store";
import axios from "axios";

// axios instance
const apiInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
});

// axios request interceptor
apiInstance.interceptors.request.use(
  (request) => {
    store.commit("loading/setLoading", true);
    return request;
  },
  (error) => {
    store.commit("loading/setLoading", false);
    throw error;
  }
);

// axios response interceptor
apiInstance.interceptors.response.use(
  (response) => {
    store.commit("loading/setLoading", false);
    return response;
  },
  (error) => {
    store.commit("loading/setLoading", false);
    throw error;
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
