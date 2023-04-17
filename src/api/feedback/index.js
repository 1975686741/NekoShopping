import request from "@/api/request";
export function submitAction(data) {
  return request({
    url: "/bufan/feedback/submitAction",
    method: "post",
    data
  });
}