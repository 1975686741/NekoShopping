import request from "@/api/request";
export function indexaction() {
  return request({
    url: "/bufan/category/indexaction"
  });
}
export function currentaction(data) {
  return request({
    url: "/bufan/category/currentaction",
    method: 'get',
    data
  });
}
export function categoryNav(data) {
  return request({
    url: "/bufan/category/categoryNav",
    method: 'get',
    data
  });
}
export function goodsList(data) {
  return request({
    url: "/bufan/goods/goodsList",
    method: 'get',
    data
  });
}