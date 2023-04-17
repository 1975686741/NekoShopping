import request from "@/api/request";
export function getListAction(data) {
  return request({
    url: "/bufan/address/getListAction",
    method: "get",
    data
  });
}
export function saveAction(data) {
  return request({
    url: "/bufan/address/saveAction",
    method: "post",
    data
  });
}
export function detailAction(data) {
  return request({
    url: "/bufan/address/detailAction",
    method: "get",
    data
  });
}
export function deleteAction(data) {
  return request({
    url: "/bufan/address/deleteAction",
    method: "get",
    data
  });
}