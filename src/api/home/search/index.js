import request from "@/api/request";
export function indexaction(data) {
  return request({
    url: "/bufan/search/indexaction",
    method: "get",
    data
  });
}
export function clearhistoryAction(data) {
  return request({
    url: "/bufan/search/clearhistoryAction",
    method: "post",
    data
  });
}
export function helperaction(data) {
  return request({
    url: "/bufan/search/helperaction",
    method: "get",
    data
  });
}
export function addhistoryaction(data) {
  return request({
    url: "/bufan/search/addhistoryaction",
    method: "post",
    data
  });
}