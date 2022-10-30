import { ClientCreate } from "./ClientCreate";
import { ClientEdit } from "./ClientEdit";
import { ClientList } from "./ClientList";
import { ClientShow } from "./ClientShow";

export default {
  name: "clients",
  list: ClientList,
  show: ClientShow,
  edit: ClientEdit,
  create: ClientCreate,
};
