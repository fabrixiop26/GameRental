import { Admin, CustomRoutes, Resource } from "react-admin";
import GameResourceProps from "resources/game";
import RentResourceProps from "resources/rent";
import ClientResourceProps from "resources/client";
import PlatformResourceProps from "resources/platforms";
import CharacterResourceProps from "resources/characters";
import { dataProvider } from "services/dataProvider";
import StatsPage from "pages/Stats";
import { Route } from "react-router-dom";
import CustomLayout from "layout";

function App() {
  return (
    <div className="App">
      <Admin
        dataProvider={dataProvider}
        title="GameRental - Dashboard"
        layout={CustomLayout}
      >
        <Resource {...GameResourceProps} />
        <Resource {...RentResourceProps} />
        <Resource {...ClientResourceProps} />
        <Resource {...PlatformResourceProps} />
        <Resource {...CharacterResourceProps} />
        <CustomRoutes>
          <Route path="/stats" element={<StatsPage />} />
        </CustomRoutes>
      </Admin>
    </div>
  );
}

export default App;
