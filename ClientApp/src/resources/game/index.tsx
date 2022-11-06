import { GameCreate } from "./GameCreate";
import { GameEdit } from "./GameEdit";
import { GameList } from "./GameList";
import { GameShow } from "./GameShow";

export default {
  name: "games",
  list: GameList,
  show: GameShow,
  edit: GameEdit,
  create: GameCreate,
};
