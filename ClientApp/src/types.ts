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
  gameId: number;
  name: string;
  company: string;
  producer: string;
  director: string;
  characterIds: number[];
  platformIds: number[];
  releaseDate: Date;
  rentPrice: number;
}

export interface GameRecord extends Game, RaRecord {}

export interface Rent {
  rentId: number;
  rentedDate: Date;
  returnDate: Date;
  rentedPrice: number;
  clientId: number;
  gameId: number;
}

export interface RentRecord extends Rent, RaRecord {}

export interface Client {
  clientId: number;
  nit: number;
  firstName: string;
  lastName: string;
  address: string;
  dob: Date;
}

export interface ClientRecord extends Client, RaRecord {}

export interface Platform {
  platformId: number;
  name: string;
}

export interface PlatformRecord extends Platform, RaRecord {}

export interface Character {
  characterId: number;
  name: string;
}

export interface CharacterRecord extends Character, RaRecord {}

export interface FilterParams {
  [key: string]: string | number;
}

export type ParsedListParams = {
  page?: number;
  perPage?: number;
  sort?: string;
  sortBy?: number;
} & FilterParams;

export interface PagedResponse<T> {
  data: T[];
  total: number;
}
