import axios from "axios";
import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from "react-admin";
import { PagedResponse, Rent, RentRecord } from "types";
import { getMaxAndMinIds, toListParams, toManyReferenceParams } from "utils";

export const rentProvider: DataProvider = {
  getList: async function (
    _: string,
    params: GetListParams
  ): Promise<GetListResult<any>> {
    //return RentRepository.getList(params);
    let parsedParams = toListParams(params, "RentId");
    const response = await axios.get<PagedResponse<Rent>>(`/api/Rents`, {
      params: {
        ...parsedParams,
      },
    });
    const mappedData: RentRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.rentId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  },
  getOne: async function (
    resource: string,
    params: GetOneParams<RentRecord>
  ): Promise<GetOneResult<any>> {
    const response = await axios.get<Rent>(`/api/rents/${params.id}`);
    const RentRecord = {
      ...response.data,
      id: response.data.rentId,
    };
    return { data: RentRecord };
  },
  getMany: async function (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<any>> {
    //target is the field in the resource
    // id is the id of the record this is coming from
    const [minId, maxId] = getMaxAndMinIds(params);
    const response = await axios.get<PagedResponse<Rent>>(`/api/Rents`, {
      params: {
        "RentId.Min": minId,
        "RentId.Max": maxId,
      },
    });
    const mappedData: RentRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.rentId,
    }));
    return {
      data: mappedData,
    };
  },
  getManyReference: async function (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<any>> {
    const parsedParams = toListParams(params, "RentId");
    const parsedManyRefenceParams = toManyReferenceParams(params);
    const response = await axios.get<PagedResponse<Rent>>(`/api/Rents`, {
      params: {
        ...parsedParams,
        ...parsedManyRefenceParams,
      },
    });
    const mappedData: RentRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.rentId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  },
  update: async function (
    resource: string,
    params: UpdateParams<Rent>
  ): Promise<UpdateResult<any>> {
    await axios.put(`/api/Rents/${params.id}`, params.data);
    return { data: { id: params.id, ...params.data } };
  },
  updateMany: async function (
    resource: string,
    params: UpdateManyParams<Rent>
  ): Promise<UpdateManyResult<any>> {
    // NOTE: Bulk actions will be disabled
    throw new Error("Function not implemented.");
  },
  create: async function (
    resource: string,
    params: CreateParams<Rent>
  ): Promise<CreateResult<any>> {
    const response = await axios.post<Rent>(`/api/Rents`, params.data);
    return { data: { id: response.data.rentId, ...response.data } };
  },
  delete: async function (
    resource: string,
    params: DeleteParams<any>
  ): Promise<DeleteResult<any>> {
    await axios.delete(`/api/Rents/${params.id}`);
    return { data: params.previousData };
  },
  deleteMany: async function (
    resource: string,
    params: DeleteManyParams<any>
  ): Promise<DeleteManyResult<any>> {
    // NOTE: Bulk actions will be disabled
    throw new Error("Function not implemented.");
  },
};
