import request from "@/api/request";
export function listaction(data) {
  return request({
    url: "/bufan/brand/listaction",
    method: 'get',
    data
  });
}
export function detailaction(data) {
  return request({
    url: "/bufan/brand/detailaction",
    method: 'get',
    data
  });
}