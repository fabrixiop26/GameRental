import {
  DataProvider,
  RaRecord,
  GetListResult,
  CreateParams,
  CreateResult,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
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
  GetListParams,
  combineDataProviders,
} from "react-admin";
import { Game, GameRecord, PagedResponse, ResourceProvider } from "../types";
import axios from "axios";
import { toListParams } from "utils";

export class GameRepository implements ResourceProvider<GameRecord> {
  constructor(private resPath: string) {}
  async getList(params: GetListParams) {
    const parsedParams = toListParams(params);
    const response = await axios.get<PagedResponse<Game>>(
      `/api/${this.resPath}`,
      {
        params: {
          ...parsedParams,
        },
      }
    );
    const mappedData: GameRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.gameId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  }
  async getOne(params: GetOneParams<GameRecord>) {
    const response = await axios.get<Game>(`/api/${this.resPath}/${params.id}`);
    const gameRecord = {
      ...response.data,
      id: response.data.gameId,
    };
    return { data: gameRecord };
  }
  // TODO: use custom endpoint?
  async getMany(params: GetManyParams): Promise<GetManyResult<GameRecord>> {
    const requests = params.ids.map((id) =>
      axios.get<Game>(`/api/${this.resPath}/${id}`)
    );
    const results = await Promise.all(requests);
    return {
      data: results.map((r) => ({
        ...r.data,
        id: r.data.gameId,
      })),
    };
  }
  getManyReference(
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<GameRecord>> {
    throw new Error("Method not implemented.");
  }
  update(params: UpdateParams<any>): Promise<UpdateResult<GameRecord>> {
    throw new Error("Method not implemented.");
  }
  updateMany(
    params: UpdateManyParams<any>
  ): Promise<UpdateManyResult<GameRecord>> {
    throw new Error("Method not implemented.");
  }
  create(params: CreateParams<any>): Promise<CreateResult<GameRecord>> {
    throw new Error("Method not implemented.");
  }
  delete(params: DeleteParams<GameRecord>): Promise<DeleteResult<GameRecord>> {
    throw new Error("Method not implemented.");
  }
  deleteMany(
    params: DeleteManyParams<GameRecord>
  ): Promise<DeleteManyResult<GameRecord>> {
    throw new Error("Method not implemented.");
  }
}

export const gameProvider: DataProvider = {
  getList: async function (
    _: string,
    params: GetListParams
  ): Promise<GetListResult<any>> {
    //return gameRepository.getList(params);
    const parsedParams = toListParams(params);
    const response = await axios.get<PagedResponse<Game>>(`/api/games`, {
      params: {
        ...parsedParams,
      },
    });
    const mappedData: GameRecord[] = response.data.data.map((g) => ({
      ...g,
      id: g.gameId,
    }));
    return {
      total: response.data.total,
      data: mappedData,
    };
  },
  getOne: async function (
    resource: string,
    params: GetOneParams<GameRecord>
  ): Promise<GetOneResult<any>> {
    const response = await axios.get<Game>(`/api/games/${params.id}`);
    const gameRecord = {
      ...response.data,
      id: response.data.gameId,
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
