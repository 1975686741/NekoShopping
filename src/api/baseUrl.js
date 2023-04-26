let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = "https://www.fastmock.site/mock/1f8ee588ba1482f1400f70afe7a6edee/NekoShopping";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "https://www.fastmock.site/mock/1f8ee588ba1482f1400f70afe7a6edee/NekoShopping";
}
export default baseURL;
