
# Game Rental

This project is part of the formation course for Sophos. The idea of the project is to serve as an application to manage video games rental by the owner

## How to run this project

There are two ways of running the project:

- The first and easiest one is to open the project in visual studio, in the profile dropdown, choose `GameRental` and start the application, this will launch both the backend and the frontend. I set up the project to use `yarn` if it is available in the system instead of `npm`.
- Run the backend and frontend separately: for this open a terminal in the root of the project and type `dotnet run --urls=http://localhost:4836` this will launch the backend at that specific URL and this is needed because without visual studio setting the enviroment variables for us, the frontend will default to this URL. Next, go to the `/ClientApp` folder and run `yarn install` to install all the dependencies needed and after that run `yarn start` to start the application and go to `http://localhost:8080` to see the application running. Although having yarn is recommended you can use `npm install` and `npm start` respectively, in fact, this is what Visual Studio will use by default, however I decided to use `yarn` for personal preferences. You can go [here](https://yarnpkg.com/) if you wish to install `yarn`.

**Note**

The `.env` files in the `/ClientApp` folder are being kept because they were created by the Visual Studio template and are bound to the backend specific configuration needed for it to run, since the values there are not critical, there is no security problem.

The connection string used to connect to the database is location in `appsettings.json` if you need to change it just go the `ConnectionStrings` field in the file and change the value of `DbConnectionString` to the one you need

## Backend

The backend was made using .Net Core 6.0 with Entity Framework and Microsoft SQL Server. It used the .Net + React template provided by Visual Studio. Besides the basic Nuget Packages for bootstraping the API with Entity Framework and SqlServer I also used:
- [Swashbuckle](https://learn.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-6.0&tabs=visual-studio), to auto generate swagger documentation for the API. You can access it going to the `<BACKEND_URL>/swagger` where `<BACKEND_URL>` is `http://localhost:5148` if you run the application with Visual Studio as explained in the previous section or `http://localhost:4836` if you manually start the backend. If you select the `IIS Express` profile in Visual Studio the application will launch swagger automatically in the browser
- [Serilog](https://serilog.net/), to log information about our API like SQL queries and HTTP requests and responses
- [AutoMapper](https://automapper.org/), to facilite the conversion between database models and DTOs
- [AutoFilterer](https://github.com/enisn/AutoFilterer), to auto generate filter query parameters from our DTO models

## Frontend

The frontend was made using React and bootstraped with Creact React App using the Typescript template. It needs NodeJS 14.17.0 or higher. I use [React Admin](https://marmelab.com/react-admin/) to build the internal dashboard because it covers most of the needs for the application. It also uses a proxy to send requests to the backend's API

## Others

### UML Generation

To generate the UML classes for the backend I use [PlantUmlClassDiagramGenerator](https://github.com/pierre3/PlantUmlClassDiagramGenerator), after install open a terminal in the root of the project and run `puml-gen . UMLDocs -dir -excludePaths ClientApp,bin,obj,Properties,Pages,node_modules -allInOne` and it will generate a `include.puml` file in `/UMLDocs` folder, open the file and then you can use [this](https://github.com/qjebbs/vscode-plantuml) VSCode extension to export it as png, svg or others format (some of them might not work). There could be other ways to export it, but that's how I did it



