const express = require("express");
const cors = require("cors");
// const ValidateToken = require("./Middleware/TokenValidation");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// FUEL MASTER
const fuelMastersRoutes = require("./Setup/GlobalRecords/FuelMaster");
app.use("/Setup/GlobalRecords", fuelMastersRoutes);

// DEPARTMENT
const departmentRoutes = require("./Setup/GlobalRecords/Department");
app.use("/Setup/GlobalRecords", departmentRoutes);

// SHIFT
const shiftRoutes = require("./Setup/GlobalRecords/Shift");
app.use("/Setup/GlobalRecords", shiftRoutes);

// PAYMENT METHOD
const paymentModeRoutes = require("./Setup/GlobalRecords/PaymentMode");
app.use("/Setup/GlobalRecords", paymentModeRoutes);

// DISCOUNT
const discountRoutes = require("./Setup/GlobalRecords/Discount");
app.use("/Setup/GlobalRecords", discountRoutes);

// DROPDOWN
const dropdownRoutes = require("./Setup/GlobalRecords/Dropdown");
app.use("/Setup/GlobalRecords", dropdownRoutes);

// EMPLOYEE
const employeeRoutes = require("./Setup/GlobalRecords/Employee");
app.use("/Setup/GlobalRecords", employeeRoutes);

// EMPLOYEE CONTACT
const employeeContactRoutes = require("./Setup/GlobalRecords/EmployeeContact");
app.use("/Setup/GlobalRecords", employeeContactRoutes);

// EMPLOYEE PHOTO
const employeePhotoRoutes = require("./Setup/GlobalRecords/EmployeePhoto");
app.use("/Setup/GlobalRecords", employeePhotoRoutes);

// CUSTOMER
const customerRoutes = require("./Setup/GlobalRecords/Customer");
app.use("/Setup/GlobalRecords", customerRoutes);

// CUSTOMER CONTACT
const customerContactPersonRoutes = require("./Setup/GlobalRecords/CustomerContactPerson");
app.use("/Setup/GlobalRecords", customerContactPersonRoutes);

// CUSTOMER VEHICLE
const customerVehicleRoutes = require("./Setup/GlobalRecords/CustomerVehicle");
app.use("/Setup/GlobalRecords", customerVehicleRoutes);

// // STATION
// const stationRoutes = require("./Setup/Stations/Station");
// app.use("/Setup/Stations", stationRoutes);

// // STATION DEPARTMENT
// const stationDepartmentRoutes = require("./Setup/Stations/StationDepartment");
// app.use("/Setup/Stations", stationDepartmentRoutes);

// // STATION SUB DEPARTMENT
// const stationDepartmentSubRoutes = require("./Setup/Stations/StationDepartmentSub");
// app.use("/Setup/Stations", stationDepartmentSubRoutes);

// // STATION DISCOUNT
// const stationDiscountRoutes = require("./Setup/Stations/StationDiscount");
// app.use("/Setup/Stations", stationDiscountRoutes);

// // STATION PAYMENT MODE
// const stationPaymentModeRoutes = require("./Setup/Stations/StationPaymentMode");
// app.use("/Setup/Stations", stationPaymentModeRoutes);

// // STATION SHIFT
// const stationShiftRoutes = require("./Setup/Stations/StationShift");
// app.use("/Setup/Stations", stationShiftRoutes);

// // STATION TANK
// const stationTankRoutes = require("./Setup/Stations/StationTank");
// app.use("/Setup/Stations", stationTankRoutes);

// // STATION TANK PUMP
// const stationTankPumpRoutes = require("./Setup/Stations/StationTankPump");
// app.use("/Setup/Stations", stationTankPumpRoutes);

// // USERS
// const settingsUserRoutes = require("./Settings/Users/User");
// app.use("/Settings/Users", settingsUserRoutes);

// // AUTHENTICATION
// const authenticationRoutes = require("./Authentication/Authentication");
// app.use("/Authentication", authenticationRoutes);

// // ROLES
// const rolesRoutes = require("./Settings/Roles");
// app.use("/Settings", ValidateToken, rolesRoutes);

// // PERMISSIONS ROUTES
// const permissionRoutes  = require("./Settings/Permissions");
// app.use("/Settings/Permissions", ValidateToken, permissionRoutes);

// /*NO ACTUAL PURPOSE JUST FOR TESTING, CHECK ONLY IF SERVER RESPONSE*/
// app.use("/testing/token", ValidateToken, async (req, res) => {
//     res.status(201).json({
//         success: true,
//         message: 'Valid',
//         body: {},
//     })
// });

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
