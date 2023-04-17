import request from "@/api/request";
export function listaction(data) {
  return request({
    url: "/bufan/topic/listaction",
    method: 'get',
    data
  });
}
export function detailaction(data) {
  return request({
    url: "/bufan/topic/detailaction",
    method: 'get',
    data
  });
}