import { Admin, Resource } from "react-admin";
import GameResourceProps from "resources/game";
import { dataProvider } from "services/dataProvider";

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider} title="GameRental - Dashboard">
        <Resource {...GameResourceProps} />
      </Admin>
    </div>
  );
}

export default App;
