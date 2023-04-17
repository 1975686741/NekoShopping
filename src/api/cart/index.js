import request from "@/api/request";
export function cartList(data) {
  return request({
    url: "/bufan/cart/cartList",
    data
  });
}
export function deleteAction(data) {
  return request({
    url: "/bufan/cart/deleteAction",
    method: 'get',
    data
  });
}
export function submitAction(data) {
  return request({
    url: "/bufan/order/submitAction",
    method: 'post',
    data
  });
}