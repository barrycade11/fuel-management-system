const express = require("express");
const cors = require("cors");
const ValidateToken = require("./Middleware/TokenValidation");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const fuelMastersRoutes = require("./Setup/GlobalRecords/FuelMaster");
app.use("/Setup/GlobalRecords", fuelMastersRoutes);

const departmentRoutes = require("./Setup/GlobalRecords/Department");
app.use("/Setup/GlobalRecords", departmentRoutes);

const shiftRoutes = require("./Setup/GlobalRecords/Shift");
app.use("/Setup/GlobalRecords", shiftRoutes);

const paymentModeRoutes = require("./Setup/GlobalRecords/PaymentMode");
app.use("/Setup/GlobalRecords", paymentModeRoutes);

const discountRoutes = require("./Setup/GlobalRecords/Discount");
app.use("/Setup/GlobalRecords", discountRoutes);

const dropdownRoutes = require("./Setup/GlobalRecords/Dropdown");
app.use("/Setup/GlobalRecords", dropdownRoutes);

const employeeRoutes = require("./Setup/GlobalRecords/Employee");
app.use("/Setup/GlobalRecords", employeeRoutes);

const customerRoutes = require("./Setup/GlobalRecords/Customer");
app.use("/Setup/GlobalRecords", customerRoutes);

//users
const settingsUserRoutes = require("./Settings/Users/User");
app.use("/Settings/Users", settingsUserRoutes);

//authentication
const authenticationRoutes = require("./Authentication/Authentication");
app.use("/Authentication", authenticationRoutes);

//roles
const rolesRoutes = require("./Settings/Roles");
app.use("/Settings", ValidateToken, rolesRoutes);

//permissions routes
const permissionRoutes  = require("./Settings/Permissions");
app.use("/Settings/Permissions", ValidateToken, permissionRoutes);

/*NO ACTUAL PURPOSE JUST FOR TESTING, CHECK ONLY IF SERVER RESPONSE*/
app.use("/testing/token", ValidateToken, async (req, res) => {
    res.status(201).json({
        success: true,
        message: 'Valid',
        body: {},
    })
})

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
