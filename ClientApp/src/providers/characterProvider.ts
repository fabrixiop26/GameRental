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
import { Character, CharacterRecord, PagedResponse } from "types";
import { getMaxAndMinIds, toListParams, toManyReferenceParams } from "utils";

export const characterProvider: DataProvider = {
  getList: async function (
    _: string,
    params: GetListParams
  ): Promise<GetListResult<any>> {
    //return CharacterRepository.getList(params);
    const parsedParams = toListParams(params, "CharacterId");
    const response = await axios.get<PagedResponse<Character>>(`/api/Characters`, {
      params: {
        ...parsedParams,
      },
    });
    const mappedData: CharacterRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.characterId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  },
  getOne: async function (
    resource: string,
    params: GetOneParams<CharacterRecord>
  ): Promise<GetOneResult<any>> {
    const response = await axios.get<Character>(`/api/Characters/${params.id}`);
    const CharacterRecord = {
      ...response.data,
      id: response.data.characterId,
    };
    return { data: CharacterRecord };
  },
  getMany: async function (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<any>> {
    //target is the field in the resource
    // id is the id of the record this is coming from
    const [minId, maxId] = getMaxAndMinIds(params);
    const response = await axios.get<PagedResponse<Character>>(`/api/Characters`, {
      params: {
        "CharacterId.Min": minId,
        "CharacterId.Max": maxId,
      },
    });
    const mappedData: CharacterRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.characterId,
    }));
    return {
      data: mappedData,
    };
  },
  getManyReference: async function (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<any>> {
    const parsedParams = toListParams(params, "CharacterId");
    const parsedManyRefenceParams = toManyReferenceParams(params);
    const response = await axios.get<PagedResponse<Character>>(`/api/Characters`, {
      params: {
        ...parsedParams,
        ...parsedManyRefenceParams,
      },
    });
    const mappedData: CharacterRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.characterId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  },
  update: async function (
    resource: string,
    params: UpdateParams<Character>
  ): Promise<UpdateResult<any>> {
    await axios.put(`/api/Characters/${params.id}`, params.data);
    return { data: { id: params.id, ...params.data } };
  },
  updateMany: async function (
    resource: string,
    params: UpdateManyParams<Character>
  ): Promise<UpdateManyResult<any>> {
    // NOTE: Bulk actions will be disabled
    throw new Error("Function not implemented.");
  },
  create: async function (
    resource: string,
    params: CreateParams<Character>
  ): Promise<CreateResult<any>> {
    const response = await axios.post<Character>(`/api/Characters`, params.data);
    return { data: { id: response.data.characterId, ...response.data } };
  },
  delete: async function (
    resource: string,
    params: DeleteParams<any>
  ): Promise<DeleteResult<any>> {
    await axios.delete(`/api/Characters/${params.id}`);
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
