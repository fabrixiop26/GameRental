import { DataProvider } from "react-admin";
import { gameProvider, GameRepository } from "../providers/gameProvider";
import { rentProvider } from "providers/rentProvider";
import { clientProvider } from "providers/clientProvider";
import { platformProvider } from "providers/platformProvider";
import { characterProvider } from "providers/characterProvider";

const providers: Record<string, DataProvider> = {
  games: gameProvider,
  rents: rentProvider,
  clients: clientProvider,
  platforms: platformProvider,
  characters: characterProvider,
};

export const dataProvider: DataProvider<string> = {
  getList: async (resource, params) => {
    return providers[resource].getList(resource, params);
  },
  getOne: (resource, params) => {
    return providers[resource].getOne(resource, params);
  },
  getMany: (resource, params) => {
    return providers[resource].getMany(resource, params);
  },
  getManyReference: (resource, params) => {
    return providers[resource].getManyReference(resource, params);
  },
  update: (resource, params) => {
    return providers[resource].update(resource, params);
  },
  updateMany: (resource, params) => {
    return providers[resource].updateMany(resource, params);
  },
  create: (resource, params) => {
    return providers[resource].create(resource, params);
  },
  delete: (resource, params) => {
    return providers[resource].delete(resource, params);
  },
  deleteMany: (resource, params) => {
    return providers[resource].deleteMany(resource, params);
  },
};
