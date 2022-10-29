import {
  RaRecord,
  Identifier,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetOneResult,
  GetManyParams,
  GetManyResult,
  GetManyReferenceParams,
  GetManyReferenceResult,
  CreateParams,
  DeleteParams,
  DeleteManyParams,
  DeleteManyResult,
  DeleteResult,
  CreateResult,
  UpdateManyResult,
  UpdateManyParams,
  UpdateParams,
  UpdateResult,
} from "react-admin";

export type ResourceNames = "games";

/**
 * Interface used for an specific
 */
export interface ResourceProvider<T extends RaRecord> {
  getList(params: GetListParams): Promise<GetListResult<T>>;
  getOne(params: GetOneParams<T>): Promise<GetOneResult<T>>;
  getMany(params: GetManyParams): Promise<GetManyResult<T>>;
  getManyReference(
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<T>>;
  update(params: UpdateParams): Promise<UpdateResult<T>>;
  updateMany(params: UpdateManyParams): Promise<UpdateManyResult<T>>;
  create(params: CreateParams): Promise<CreateResult<T>>;
  delete(params: DeleteParams<T>): Promise<DeleteResult<T>>;
  deleteMany(params: DeleteManyParams<T>): Promise<DeleteManyResult<T>>;
}

export interface Game {
  gameId: Identifier;
  name: string;
  characters: string[];
  company: string;
  producer: string;
  director: string;
  platforms: string[];
  releaseDate: Date;
  rentPrice: number;
}

export interface GameRecord extends Game, RaRecord {}

export interface ParsedListParams {
  page?: number;
  perPage?: number;
  sort?: string;
  sortBy?: number;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
}
