import request from "@/api/request";
export function detailaction(data) {
  return request({
    url: "/bufan/goods/detailaction",
    data
  });
}
export function addcollect(data) {
  return request({
    url: "/bufan/collect/addcollect",
    method: 'post',
    data
  });
}
export function addCart(data) {
  return request({
    url: "/bufan/cart/addCart",
    method: 'post',
    data
  });
}