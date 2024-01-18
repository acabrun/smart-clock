import { Alarm } from "../types/Alarm";

type AlarmResponse<T> = {
  code: number;
  data: T;
};

const fetchGet = async (url: string): Promise<AlarmResponse<Alarm[]>> => {
  return await fetch(url).then((res) => res.json());
};

const fetchPost = async (
  url: string,
  data: any
): Promise<AlarmResponse<Alarm>> => {
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

const fetchDelete = async (
  url: string
): Promise<AlarmResponse<{ id: number }>> => {
  return await fetch(url, {
    method: "DELETE",
  }).then((res) => res.json());
};

export default {
  fetchGet,
  fetchPost,
  fetchDelete,
};
