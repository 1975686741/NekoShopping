import request from "@/api/request";
export function listAction(data) {
  return request({
    url: "/bufan/collect/listAction",
    method: "get",
    data
  });
}
