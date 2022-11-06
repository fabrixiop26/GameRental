import { RentCreate } from "./RentCreate";
import { RentList } from "./RentList";
import { RentShow } from "./RentShow";

export default {
  name: "rents",
  list: RentList,
  show: RentShow,
  create: RentCreate,
};
