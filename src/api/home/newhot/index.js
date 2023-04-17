import request from "@/api/request";
export function goodsList(data) {
  return request({
    url: "/bufan/goods/goodsList",
    method: "get",
    data
  });
}
