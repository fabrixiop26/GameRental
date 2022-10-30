import {
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
} from "react-admin";
import { ParsedListParams } from "types";

export const toListParams = (
  params: GetListParams,
  sortIdOverride: string = "id"
) => {
  let parsedParams: ParsedListParams = {};
  if (params.pagination) {
    parsedParams = {
      ...parsedParams,
      ...params.pagination,
    };
  }
  if (params.sort) {
    parsedParams = {
      ...parsedParams,
      sort: params.sort.field === "id" ? sortIdOverride : params.sort.field,
      sortBy: params.sort.order === "ASC" ? 0 : 1,
    };
  }
  return parsedParams;
};

export const getMaxAndMinIds = (params: GetManyParams) => {
  const numIds = params.ids.map((i) => +i);
  const minId = Math.min(...numIds);
  const maxId = Math.max(...numIds);
  return [minId, maxId];
};

export const toManyParams = (params: GetManyReferenceParams) => {
  // target is the field in the resource
  // id is the id (value) from this is coming from.
  // if in ReferenceOneField source is used then the value will be the foreign key value and not record's id
  return {
    [`${params.target}.Min`]: params.id,
    [`${params.target}.Max`]: params.id,
  };
};
