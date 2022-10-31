import {
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
} from "react-admin";
import { ParsedListParams } from "types";

const operators: Record<string, string> = {
  _gte: "Min",
  _lte: "Max",
  _eql: "EQ",
};

const parseOperators = (filter: Record<string, any>) => {
  // filters is like [
  //    { field: "Date.Min",value: "2018-01-01"},
  //    { field: "Id.Max", value: 3}
  // ]
  return Object.keys(filter).flatMap((key) => {
    //extract the operator _gte or _lte
    const operator = operators[key.slice(-4)];
    const field = key.slice(0, -4);
    if (operator === "EQ") {
      return [
        {
          field: `${field}.Min`,
          value: filter[key],
        },
        {
          field: `${field}.Max`,
          value: filter[key],
        },
      ];
    }
    return operator
      ? { field: `${field}.${operator}`, value: filter[key] }
      : { field: key, value: filter[key] };
  });
};

export const toListParams = (
  params: GetListParams,
  sortIdOverride: string = "id"
) => {
  const filterList = parseOperators(params.filter);
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
  filterList.forEach(({ field, value }) => {
    parsedParams = {
      ...parsedParams,
      [field]: value,
    };
  });
  parsedParams = {
    ...parsedParams,
  };
  return parsedParams;
};

export const getMaxAndMinIds = (params: GetManyParams) => {
  const numIds = params.ids.map((i) => +i);
  const minId = Math.min(...numIds);
  const maxId = Math.max(...numIds);
  return [minId, maxId];
};

export const toManyReferenceParams = (params: GetManyReferenceParams) => {
  // target is the field in the resource
  // id is the id (value) from this is coming from.
  // if in ReferenceOneField source is used then the value will be the foreign key value and not record's id
  return {
    [`${params.target}.Min`]: params.id,
    [`${params.target}.Max`]: params.id,
  };
};
