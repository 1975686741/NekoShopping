import request from "@/api/request";
export function index() {
  return request({
    url: "/bufan/index/index"
  });
}
