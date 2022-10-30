import { Admin, Resource } from "react-admin";
import GameResourceProps from "resources/game";
import RentResourceProps from "resources/rent";
import ClientResourceProps from "resources/client";
import PlatformResourceProps from "resources/platforms";
import CharacterResourceProps from "resources/characters";
import { dataProvider } from "services/dataProvider";

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider} title="GameRental - Dashboard">
        <Resource {...GameResourceProps} />
        <Resource {...RentResourceProps} />
        <Resource {...ClientResourceProps} />
        <Resource {...PlatformResourceProps} />
        <Resource {...CharacterResourceProps} />
      </Admin>
    </div>
  );
}

export default App;
