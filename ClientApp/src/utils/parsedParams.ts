import { GetListParams } from "react-admin";
import { ParsedListParams } from "types";

export const toListParams = (params: GetListParams) => {
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
      sort: params.sort.field,
      sortBy: params.sort.order === "ASC" ? 0 : 1,
    };
  }
  return parsedParams;
};
