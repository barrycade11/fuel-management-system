import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import StringRoutes from "./Constants/StringRoutes.js";

export default [
    /*
     * - Layout
     * add your page/views inside the layout
     */
    index("./Pages/Login/index.jsx"),


    layout("./Layouts/DashboardLayout.jsx", [
        //initial dashboard page
        route(StringRoutes.dashboard, "./Pages/Dashboard/index.jsx"),
        route(StringRoutes.salesTransactions, "./Pages/SalesTransactions/index.jsx"),

      route("fuel-price", "./SubRoutes/FuelManagement/FuelPrice.jsx"),
      route("fuel-delivery", "./SubRoutes/FuelManagement/FuelDelivery.jsx"),
      route("lubricants", "./SubRoutes/FuelManagement/Lubricants.jsx"),
    ]),
    
    
    route(StringRoutes.serviceManagement, "./Pages/ServiceManagement/index.jsx"),
    route(StringRoutes.inventoryManagement, "./Pages/InventoryManagement/index.jsx"),

    route(StringRoutes.globalSetup, "./Pages/GlobalSetup/index.jsx", [
      index("./SubRoutes/GlobalSetup/FuelMaster.jsx"), // globalSetup index (fuelMaster)


        route(StringRoutes.serviceManagement, "./Pages/ServiceManagement/index.jsx"),
        route(StringRoutes.inventoryManagement, "./Pages/InventoryManagement/index.jsx"),

    ]),


    route(StringRoutes.settings, "./Pages/Settings/index.jsx", [
        index("./SubRoutes/Settings/User.jsx"),

        route(StringRoutes.permission, "./SubRoutes/Settings/Permissions.jsx"),

    ])
] satisfies RouteConfig;
