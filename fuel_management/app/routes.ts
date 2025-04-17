import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import StringRoutes from "./Constants/StringRoutes.js";

export default [
    /*
      * - Layout
      * add your page/views inside the layout
      */

    index("./Pages/Login/index.jsx"),
    route(StringRoutes.changePassword, "./SubRoutes/Auth/ChangePassword.jsx"),

    layout("./Layouts/DashboardLayout.jsx", [
        //initial dashboard page
        route(StringRoutes.dashboard, "./Pages/Dashboard/index.jsx"),
        route(StringRoutes.salesTransactions, "./Pages/NewSalesTransactions/index.jsx"),
        route(StringRoutes.oldSalesTransactions, "./Pages/SalesTransactions/index.jsx"),

        route(StringRoutes.fuelManagement, "./Pages/FuelManagement/index.jsx", [
            index("./SubRoutes/FuelManagement/FuelMaster.jsx"), // fuelManagement index (fuelMaster)
            
            route("fuel-price", "./SubRoutes/FuelManagement/FuelPrice.jsx"),

            route("fuel-delivery", "./SubRoutes/FuelManagement/FuelDelivery.jsx"), 
            route("fuel-delivery/:fuelDeliveryId?", "./SubRoutes/FuelManagement/FuelDeliveryEdit.jsx"),
            route("fuel-delivery-list", "./SubRoutes/FuelManagement/FuelDeliveryList.jsx"),
            route("fuel-delivery-attachment/:fuelDeliveryId?", "./SubRoutes/FuelManagement/FuelDeliveryAttachment.jsx"),
            route("lubricants", "./SubRoutes/FuelManagement/Lubricants.jsx"),

            route("lubes-master", "./SubRoutes/FuelManagement/LubesMaster.jsx"),

        ]),


        route(StringRoutes.serviceManagement, "./Pages/ServiceManagement/index.jsx"),
        route(StringRoutes.inventoryManagement, "./Pages/InventoryManagement/index.jsx"),

        route(StringRoutes.globalSetup, "./Pages/GlobalSetup/index.jsx", [
            index("./SubRoutes/GlobalSetup/FuelMaster.jsx"), // globalSetup index (fuelMaster)

            route("departments", "./SubRoutes/GlobalSetup/Department.jsx"),
            route("shifts", "./SubRoutes/GlobalSetup/Shift.jsx"),
            route("payment-modes", "./SubRoutes/GlobalSetup/PaymentMode.jsx"),
            route("discounts", "./SubRoutes/GlobalSetup/Discount.jsx"),
            route("dropdown-records", "./SubRoutes/GlobalSetup/DropdownRecord.jsx"),
            route("employees", "./SubRoutes/GlobalSetup/Employee.jsx"),
            route("customers", "./SubRoutes/GlobalSetup/Customer.jsx"),
            route("targets", "./SubRoutes/GlobalSetup/Target.jsx"),
            // route("incentives", "./SubRoutes/GlobalSetup/Incentive.jsx"),
        ]),


        route(StringRoutes.settings, "./Pages/Settings/index.jsx", [
            // index("./SubRoutes/Settings/User.jsx"),
            index("./SubRoutes/Settings/User.jsx"),

            route(`${StringRoutes.register}/:id?`, './SubRoutes/Settings/UserRegistration.jsx'),
            route(StringRoutes.permission, "./SubRoutes/Settings/Permissions.jsx"),

        ]),

        route(StringRoutes.stationList, "./Pages/Station/index.jsx", [
            index("./Pages/Station/StationList.jsx"),
            route('details/:id?', "./Pages/Station/StationDetails.jsx", [
                index("./SubRoutes/Stations/InitialPage.jsx"),
            
                route(StringRoutes.shifts, './SubRoutes/Stations/ShiftsPage.jsx'),
            ])
        ]),

    ]),




] satisfies RouteConfig;
