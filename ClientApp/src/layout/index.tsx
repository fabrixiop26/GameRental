import { Layout, LayoutProps, Menu, MenuProps, Title } from "react-admin";

const CustomMenu = (props: MenuProps) => (
  <Menu {...props}>
    <Menu.DashboardItem/>
    <Menu.Item to="/games" primaryText="Games" />
    <Menu.Item to="/rents" primaryText="Rents" />
    <Menu.Item to="/clients" primaryText="Clients" />
    <Menu.Item to="/platforms" primaryText="Platforms" />
    <Menu.Item to="/characters" primaryText="Characters" />
    <Menu.Item to="/stats" primaryText="Stats" />
  </Menu>
);

const CustomLayout = (props: LayoutProps) => (
  <Layout {...props} menu={CustomMenu} />
);

export default CustomLayout;
