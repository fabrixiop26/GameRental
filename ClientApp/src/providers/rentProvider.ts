import axios from "axios";
import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "react-admin";
import { PagedResponse, Game, GameRecord, Rent, RentRecord } from "types";
import { toListParams } from "utils";

export const rentProvider: DataProvider = {
    getList: async function (
      _: string,
      params: GetListParams
    ): Promise<GetListResult<any>> {
      //return gameRepository.getList(params);
      const parsedParams = toListParams(params);
      const response = await axios.get<PagedResponse<Rent>>(`/api/rents`, {
        params: {
          ...parsedParams,
        },
      });
      const mappedData: RentRecord[] = response.data.data.map((r) => ({
        ...r,
        id: r.rentId,
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
      const gameRecord = {
        ...response.data,
        id: response.data.rentId,
      };
      return { data: gameRecord };
    },
    getMany: async function (
      resource: string,
      params: GetManyParams
    ): Promise<GetManyResult<any>> {
      throw new Error("Function not implemented.");
    },
    getManyReference: function (
      resource: string,
      params: GetManyReferenceParams
    ): Promise<GetManyReferenceResult<any>> {
      throw new Error("Function not implemented.");
    },
    update: async function (
      resource: string,
      params: UpdateParams<Game>
    ): Promise<UpdateResult<any>> {
      const response = await axios.put(`/api/games/${params.id}`, params.data);
      return { data: { id: params.id, ...params.data } };
    },
    updateMany: async function (
      resource: string,
      params: UpdateManyParams<Game>
    ): Promise<UpdateManyResult<any>> {
      throw new Error("Function not implemented.");
    },
    create: async function (
      resource: string,
      params: CreateParams<Game>
    ): Promise<CreateResult<any>> {
      const response = await axios.post<Game>(`/api/games`, params.data);
      return { data: { id: response.data.gameId, ...response.data } };
    },
    delete: async function (
      resource: string,
      params: DeleteParams<any>
    ): Promise<DeleteResult<any>> {
      throw new Error("Function not implemented.");
    },
    deleteMany: async function (
      resource: string,
      params: DeleteManyParams<any>
    ): Promise<DeleteManyResult<any>> {
      throw new Error("Function not implemented.");
    },
  };