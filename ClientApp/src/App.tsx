import { Admin, Resource } from "react-admin";
import GameResourceProps from "resources/game";
import RentResourceProps from "resources/rent";
import { dataProvider } from "services/dataProvider";

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider} title="GameRental - Dashboard">
        <Resource {...GameResourceProps} />
        <Resource {...RentResourceProps} />
      </Admin>
    </div>
  );
}

export default App;
