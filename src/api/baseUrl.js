let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = "http://shop.bufantec.com";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "http://shop.bufantec.com";
}
export default baseURL;
