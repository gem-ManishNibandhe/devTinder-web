//Production URL
// export const BASE_URL = "/api";

//Local development URL
export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777" : "/api";