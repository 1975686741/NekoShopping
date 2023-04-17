import request from "@/api/request";
export function detailAction(data) {
  return request({
    url: "/bufan/order/detailAction",
    data
  });
}

