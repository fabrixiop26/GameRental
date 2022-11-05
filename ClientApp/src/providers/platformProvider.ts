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
import { PagedResponse, Platform, PlatformRecord } from "types";
import { getMaxAndMinIds, toListParams, toManyReferenceParams } from "utils";

export const platformProvider: DataProvider = {
  getList: async function (
    _: string,
    params: GetListParams
  ): Promise<GetListResult<any>> {
    //return PlatformRepository.getList(params);
    const parsedParams = toListParams(params, "PlatformId");
    const response = await axios.get<PagedResponse<Platform>>(
      `/api/Platforms`,
      {
        params: {
          ...parsedParams,
        },
      }
    );
    const mappedData: PlatformRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.platformId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  },
  getOne: async function (
    resource: string,
    params: GetOneParams<PlatformRecord>
  ): Promise<GetOneResult<any>> {
    const response = await axios.get<Platform>(`/api/Platforms/${params.id}`);
    const PlatformRecord = {
      ...response.data,
      id: response.data.platformId,
    };
    return { data: PlatformRecord };
  },
  getMany: async function (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<any>> {
    let parsedParams = params;
    const isEdgeCase = params.ids.some(
      (v) => typeof v !== "number" && typeof v !== "string"
    );
    if (isEdgeCase) {
      parsedParams = {
        ...parsedParams,
        ids: params.ids.map((v: any) => v.platformId),
      };
    }
    //target is the field in the resource
    // id is the id of the record this is coming from
    const [minId, maxId] = getMaxAndMinIds(parsedParams);
    const response = await axios.get<PagedResponse<Platform>>(
      `/api/Platforms`,
      {
        params: {
          "PlatformId.Min": minId,
          "PlatformId.Max": maxId,
        },
      }
    );
    const mappedData: PlatformRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.platformId,
    }));
    return {
      data: mappedData,
    };
  },
  getManyReference: async function (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<any>> {
    const parsedParams = toListParams(params, "PlatformId");
    const parsedManyRefenceParams = toManyReferenceParams(params);
    const response = await axios.get<PagedResponse<Platform>>(
      `/api/Platforms`,
      {
        params: {
          ...parsedParams,
          ...parsedManyRefenceParams,
        },
      }
    );
    const mappedData: PlatformRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.platformId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  },
  update: async function (
    resource: string,
    params: UpdateParams<Platform>
  ): Promise<UpdateResult<any>> {
    await axios.put(`/api/Platforms/${params.id}`, params.data);
    return { data: { id: params.id, ...params.data } };
  },
  updateMany: async function (
    resource: string,
    params: UpdateManyParams<Platform>
  ): Promise<UpdateManyResult<any>> {
    // NOTE: Bulk actions will be disabled
    throw new Error("Function not implemented.");
  },
  create: async function (
    resource: string,
    params: CreateParams<Platform>
  ): Promise<CreateResult<any>> {
    const response = await axios.post<Platform>(`/api/Platforms`, params.data);
    return { data: { id: response.data.platformId, ...response.data } };
  },
  delete: async function (
    resource: string,
    params: DeleteParams<any>
  ): Promise<DeleteResult<any>> {
    await axios.delete(`/api/Platforms/${params.id}`);
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
