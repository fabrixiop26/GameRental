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
import { Client, ClientRecord, PagedResponse } from "types";
import { getMaxAndMinIds, toListParams, toManyReferenceParams } from "utils";

export const ClientProvider: DataProvider = {
  getList: async function (
    _: string,
    params: GetListParams
  ): Promise<GetListResult<any>> {
    //return ClientRepository.getList(params);
    const parsedParams = toListParams(params, "ClientId");
    const response = await axios.get<PagedResponse<Client>>(`/api/Clients`, {
      params: {
        ...parsedParams,
      },
    });
    const mappedData: ClientRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.clientId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  },
  getOne: async function (
    resource: string,
    params: GetOneParams<ClientRecord>
  ): Promise<GetOneResult<any>> {
    const response = await axios.get<Client>(`/api/Clients/${params.id}`);
    const ClientRecord = {
      ...response.data,
      id: response.data.clientId,
    };
    return { data: ClientRecord };
  },
  getMany: async function (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<any>> {
    //target is the field in the resource
    // id is the id of the record this is coming from
    const [minId, maxId] = getMaxAndMinIds(params);
    const response = await axios.get<PagedResponse<Client>>(`/api/Clients`, {
      params: {
        "ClientId.Min": minId,
        "ClientId.Max": maxId,
      },
    });
    const mappedData: ClientRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.clientId,
    }));
    return {
      data: mappedData,
    };
  },
  getManyReference: async function (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<any>> {
    const parsedParams = toListParams(params, "ClientId");
    const parsedManyRefenceParams = toManyReferenceParams(params);
    const response = await axios.get<PagedResponse<Client>>(`/api/Clients`, {
      params: {
        ...parsedParams,
        ...parsedManyRefenceParams,
      },
    });
    const mappedData: ClientRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.clientId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  },
  update: async function (
    resource: string,
    params: UpdateParams<Client>
  ): Promise<UpdateResult<any>> {
    await axios.put(`/api/Clients/${params.id}`, params.data);
    return { data: { id: params.id, ...params.data } };
  },
  updateMany: async function (
    resource: string,
    params: UpdateManyParams<Client>
  ): Promise<UpdateManyResult<any>> {
    // NOTE: Bulk actions will be disabled
    throw new Error("Function not implemented.");
  },
  create: async function (
    resource: string,
    params: CreateParams<Client>
  ): Promise<CreateResult<any>> {
    const response = await axios.post<Client>(`/api/Clients`, params.data);
    return { data: { id: response.data.clientId, ...response.data } };
  },
  delete: async function (
    resource: string,
    params: DeleteParams<any>
  ): Promise<DeleteResult<any>> {
    await axios.delete(`/api/Clients/${params.id}`);
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
