import axios, { AxiosResponse } from "axios";

// axios instance
const apiInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000,
});

// axios response interceptor
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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
