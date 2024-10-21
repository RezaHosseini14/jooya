import http from "./http.services";

export const serachService = (data: any) => {
  return http.post("/v1/search/content", data);
};

export const resultByIdService = (data: any) => {
  return http.post("/v1/search/get-content", data);
};

export const highlightService = (data: any) => {
  return http.post("/v1/search/highlight-content", data);
};
